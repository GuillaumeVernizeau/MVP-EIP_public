const { MongoClient } = require("mongodb");

const mongodbOptions = {
useNewUrlParser: true,
};
const uri = `mongodb://${process.env.MONGO_HOST}:27017/pog`;
const client = new MongoClient(uri, mongodbOptions);

module.exports = client;