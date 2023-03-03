require("dotenv").config();
const express = require("express");
const app = express();
const file_upload = require('express-fileupload');
const cors = require("cors");
const mongo = require("./middleware/mongo_connect");

app.use(file_upload({
    createParentPath: true
}));
app.use(express.json());
app.use(cors());

app.use(require("./routes/dishes"));
app.use(require("./routes/fridges"));

mongo.connect(async (err, db) => {
    if (err) {
        console.log(`Failed to connect to the database. ${err.stack}`);
        process.exit(1);
    }
    app.locals.db = db;

    app.listen(process.env.APP_PORT, () => {
        console.log(`Listening on port ${process.env.APP_PORT}`);
    });
});