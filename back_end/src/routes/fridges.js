const router = require("express").Router();
const is_valid = require("../middleware/check_data");
const { ObjectId } = require("mongodb");

/**
*
* GET ALL FRIDGES
*
* Possible returns:
*   200:
*       - array of result following this format:
*            [
*                {
*                    _id:        ID of the fridge
*                    dishes:     Fix count list of dishes, null for no dish
*                    position:   Position of the fridge as string
*                },
*            ]
*   500:
*       - error: Details about server error as JSON
*
*/
router.get("/fridges", (req, res) => {
    const db = req.app.locals.db.db("pog").collection("fridges");

    db.find({}).toArray((err, result) => {
        if (err)
            return res.status(500).send(err);
        var filtered = result.filter(function (value, index, arr) {
            return (value.dishes.indexOf(null) != -1);
        });
        res.status(200).send(filtered);
    });
});

/**
*
* REMOVE A FRIDGE
*
* The route parameters must respect these specifications:
*   id: valid ID of a fridge
*
* Possible returns:
*   200:
*       - msg: Confirmation message
*   500:
*       - error: Details about server error as JSON
*
*/
router.delete("/fridges/:id", (req, res) => {
    const db = req.app.locals.db.db("pog").collection("fridges");
    var to_del = { _id: ObjectId(req.params.id) };

    db.deleteOne(to_del, (err, res_insert) => {
        if (err || !res_insert.deletedCount) res.status(500).send(err);
        else res.status(200).send({ msg: "Deleted" });
    });
});

/**
*
* ADD A FRIDGE
*
* This request must be made using application/json as Content-Type.
*
* Every property must be passed by POST body as JSON data unless otherwise
* specified.
*
* The properties must respect these types:
*   location:   string
*   storage:    number
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
router.post("/fridges", (req, res) => {
    const data = req.body;
    const db = req.app.locals.db.db("pog").collection("fridges");

    if (!is_valid(["storage", "location"], data))
        return res.status(400).send({ msg: "Missing mandatory element" });

    if (typeof data.storage != 'number')
        return res.status(400).send({ msg: "Error on requested types" });

    var new_fridge = {
        position: data.location,
        storage: data.storage,
        dishes: Array(data.storage).fill(undefined)
    };

    db.insertOne(new_fridge, (err, res_insert) => {
        if (err) res.status(500).send(err);
        else {
            res.status(201).send({ id: res_insert.insertedId });
        }
    });
});

module.exports = router;