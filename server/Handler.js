"use strict";

const { MongoClient } = require("mongodb");
require("dotenv").config({ path: "./.env" });
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

// returns a list of all items
const getAllQuestions = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);

    try {
        await client.connect();
        const db = client.db("StudyPal");
        const result = await db.collection("questions").find().toArray();
        if (result) {
            res.status(200).json({ status: 200, data: result });
        } else {
            res.status(404).json({ status: 404, message: "Items not found" });
        }  
    } catch (err) {
        console.log(err.stack);
        res.status(500).json({ status: 500, message: err.message });
    }

    client.close()
};




module.exports = {
    getAllQuestions,
};
