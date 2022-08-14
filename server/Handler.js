"use strict";

const { MongoClient } = require("mongodb");
require("dotenv").config({ path: "./.env" });
const { MONGO_URI } = process.env;
const { v4: uuidv4 } = require("uuid");

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

// returns a list of all questions by user
const getAllQuestions = async (req, res) => {
    const _id = req.params.userId;
    const client = new MongoClient(MONGO_URI, options);

    try {
        await client.connect();
        const db = client.db("StudyPal");
        const result = await db.collection("questions").findOne({_id});
        if (result) {
            res.status(200).json({ status: 200, data: result.questions});
        } else {
            const questions = {
                _id: _id,
                questions: []
            }
            await db.collection("questions").insertOne(questions);
            res.status(200).json({ status: 200, data: questions.questions });
        }
    } catch (err) {
        console.log(err.stack);
        res.status(500).json({ status: 500, message: err.message });
    }

    client.close()
};

const addQuestion = async (req, res) => {
    const questionContent = req.body; // {subject: subject, stem: stem, question: question, answer: answer}
    console.log(questionContent)
    const _id = req.params.userId;
    const client = new MongoClient(MONGO_URI, options);

    try {
        await client.connect();
        const db = client.db("StudyPal");
        const result = await db.collection("questions").findOne({_id});
        if (result) {
            // console.log(result.questions)
            result.questions.push({_id: uuidv4(), ...questionContent}),
            await db.collection("questions").updateOne({ _id }, { $set: result });
            res.status(201).json({ status: 200, data: result });
        } else {
            const questions = {
                _id: _id,
                questions: [{_id: uuidv4(), ...questionContent}]
            }
            await db.collection("questions").insertOne(questions);
            res.status(201).json({ status: 200, data: questions });
        }  
        
    } catch (err) {
        console.log(err.stack);
        res.status(500).json({ status: 500, data: req.body, message: err.message });
    }

    client.close()
};


module.exports = {
    getAllQuestions,
    addQuestion,
};
