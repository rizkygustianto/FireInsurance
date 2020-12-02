const { MongoClient } = require("mongodb");
const url = process.env.DB_URL || "mongodb://localhost:27017";
const dbName = process.env.dbName || "FireInsurance";

const client = new MongoClient(url, { useUnifiedTopology: true });
client.connect();

const db = client.db(dbName);

module.exports = db;