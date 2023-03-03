const router = require("express").Router();
const is_valid = require("../middleware/check_data");
const { existsSync } = require("fs");
const { ObjectId } = require("mongodb");
const { randomInt } = require("crypto");

/**
*
* GET ALL DISHES
*
*
* Allergens can be excluded by passing a 'filters' query param, as a JSON
* parsable object of allergen ids.
* For example: /dishes?filters=[1,4,5]
*
* Possible returns:
*   200:
*       - array of result following this format:
*           [
*               {
*                   _id:        ID of the dish
*                   name:       String containing name
*                   desc:       String containing desc
*                   time:       UNIX timestamp at which dish was added
*                   dish_pos:   Location of the dish inside the fridge (1..N)
*                   fridge_loc: Location of the fridge
*                   allergens:  Array of numbers describing allergens
*               },
*           ]
*   400:
*       - msg:      Message explaining why the request was denied
*   500:
*       - error:    Details about server error as JSON
*
*/
router.get("/dishes", (req, res) => {
    const db = req.app.locals.db.db("pog");
    var find = { code: undefined };

    if (req.query.filters != undefined) {
        try {
            var allergens = JSON.parse(req.query.filters);
            if (allergens.constructor.name != "Array")
                return res.status(400).send({ msg: "Wrong filter" });
        } catch (error) {
            return res.status(400).send({ msg: "Wrong filter" });
        }
        for (let i = 0; i < allergens.length; i++) {
            if (allergens[i] > 15 || allergens[i] < 1)
                return res.status(400).send({ msg: "Wrong filter" });
        }
        find = { allergens: { $nin: allergens }, code: undefined };
    }

    db.collection("fridges").find({}).toArray((err_arr, fridges) => {
        if (err_arr) return res.status(500).send(err);

        db.collection("dishes").find(find).toArray((err, dishes) => {
            if (err) return res.status(500).send(err);

            var temp_array = []
            for (let count = 0; count < dishes.length; count++) {
                let dish = dishes[count];
                let fridge = fridges.find(object => {
                    return object._id == dish.fridge_id
                })
                dish.fridge_loc = fridge.position;
                dish.dish_pos = fridge.dishes.indexOf(`${dish._id}`) + 1;
                delete dish.fridge_id;
                delete dish.code;
                temp_array.push(dish);
            }
            return res.status(200).send(temp_array);
        });
    });
});

/**
*
* GET A THUMBNAIL
*
* The route parameters must respect these specifications:
*   id: valid ID of a dish
*
* Possible returns:
*   200:
*       - file data
*   400:
*       - msg:  Message explaining why the request was denied
*
*/
router.get("/thumbnail/:id", (req, res) => {
    const path = `${process.env.TB_PATH}/${req.params.id}.jpg`;

    try {
        if (existsSync(path)) {
            res.status(200).sendFile(path);
        } else
            res.status(404).send({ msg: "Not found" });
    } catch (err) {
        console.log(err);
    }
});

/**
*
* REMOVE A DISH
*
* The route parameters must respect these specifications:
*   id: valid ID of a dish
*
* Possible returns:
*   200:
*       - msg:      Confirmation message
*   400:
*       - msg:      Message explaining why the request was denied
*   500:
*       - error:    Details about server error as JSON
*
*/
router.delete("/dishes/:id", (req, res) => {
    const db = req.app.locals.db.db("pog");
    var to_del = { _id: ObjectId(req.params.id) };

    db.collection("fridges").updateMany(
        { dishes: req.params.id },
        { $set: { "dishes.$": undefined } },
        (err, res_update) => {
            if (err) return res.status(500).send(err);

            db.collection("dishes").deleteOne(to_del, (err, res_insert) => {
                if (err)
                    return res.status(500).send(err);
                if (!res_insert.deletedCount)
                    return res.status(400).send({ msg: "Invalid ID" });
                else {
                    try {
                        fs.unlinkSync(`${process.env.TB_PATH}/${req.params.id}.jpg`);
                    } catch (error) {
                        res.status(200).send({ msg: "Error when trying to delete thumbnail" });
                    }
                    res.status(200).send({ msg: "Deleted" });
                }
            });
        });
});

/**
*
* DECLARE A DISH AS CLAIMED
*
* The route parameters must respect these specifications:
*   id: valid ID of a dish
*
* Possible returns:
*   200:
*       - code:     Unique generated code
*   400:
*       - msg:      Message explaining why the request was denied
*   500:
*       - error:    Details about server error as JSON
*
*/
router.put("/dishes/:id/collect", (req, res) => {
    const db = req.app.locals.db.db("pog");
    var to_edit = { _id: ObjectId(req.params.id) };
    const code = randomInt(1000, 9999);

    db.collection("fridges").updateOne(
        to_edit,
        { $set: { code: code } },
        (err, res_update) => {
            if (err) return res.status(500).send(err);
            res.status(200).send({ code: code });
        });
});


/**
*
* ADD A DISH
*
* This request must be made using multipart/form-data as Content-Type.
*
* Every property must be passed by POST body as JSON parsable data unless
* otherwise specified.
*
* The properties must respect these types:
*   name:       string
*   desc:       string
*   fridge_id:  valid ID of a fridge as a string
*   allergens:  array of numbers
*   thumbnail:  image (NOT JSON)
*
* Possible returns:
*   200:
*       - id:       ID of the new item once inserted in DB
*   400:
*       - msg:      Message explaining why the request was denied
*   500:
*       - error:    Details about server error as JSON
*
*/
router.post("/dishes", (req, res) => {
    const data = req.body;
    const db = req.app.locals.db.db("pog");

    if (!is_valid(["name", "desc", "allergens", "fridge_id"], data))
        return res.status(400).send({ msg: "Missing mandatory element(s)" });
    if (!req.files || !req.files.thumbnail)
        return res.status(400).send({ msg: "Missing file" });

    try {
        var allergens = JSON.parse(data.allergens);
        if (allergens.constructor.name != "Array")
            return res.status(400).send({ msg: "Wrong allergens data" });
    } catch (error) {
        return res.status(400).send({ msg: "Wrong allergens data" });
    }
    for (let i = 0; i < allergens.length; i++) {
        if (allergens[i] > 15 || allergens[i] < 1)
            return res.status(400).send({ msg: "Wrong allergens data" });
    }

    var new_dish = {
        name: data.name,
        desc: data.desc,
        time: Math.floor(Date.now() / 1000),
        fridge_id: data.fridge_id,
        allergens: allergens
    };

    const code = randomInt(1000, 9999);

    db.collection("fridges").find({ _id: ObjectId(data.fridge_id) }).toArray((err, result) => {
        if (err)
            return res.status(500).send(err_arr);
        if (result.length == 0)
            return res.status(400).send({ msg: "Invalid fridge ID" });
        if (result[0].dishes.indexOf(null) == -1) {
            return res.status(400).send({ msg: "Fridge is full" });
        }

        db.collection("dishes").insertOne(new_dish, (err, res_insert) => {
            if (err) res.status(500).send(err);

            db.collection("fridges").updateOne(
                { _id: ObjectId(data.fridge_id), dishes: undefined },
                { $set: { "dishes.$": `${res_insert.insertedId}` } },
                (err, res_update) => {
                    if (err) res.status(500).send(err);
                    else {
                        req.files.thumbnail.mv(`${process.env.TB_PATH}/${res_insert.insertedId}.jpg`);
                        res.status(201).send({ id: res_insert.insertedId, code: code });
                    }
                });
        });
    });
});

module.exports = router;