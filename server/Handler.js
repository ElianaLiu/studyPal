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
        
        // check if userId exist
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

// Endpoints for adding a question
const addQuestion = async (req, res) => {
    const questionContent = req.body;
    console.log(questionContent)
    const _id = req.params.userId;
    const client = new MongoClient(MONGO_URI, options);

    try {
        await client.connect();
        const db = client.db("StudyPal");
        const result = await db.collection("questions").findOne({_id});

        // check if userId exist
        if (result) {
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

// Endpoints for deleting a question
const deleteQuestion = async (req, res) => {
    const questionId = req.body._id;
    const _id = req.params.userId;
    const client = new MongoClient(MONGO_URI, options);

    try {
        await client.connect();
        const db = client.db("StudyPal");
        const result = await db.collection("questions").findOne({_id});

        // check if userId exist
        if (result) {
            let newQuestions = result.questions.filter((item) => {
                return item._id !== questionId;
            });
            if (result.questions.length > newQuestions.length) {
                await db.collection("questions").updateOne({ _id }, { $set: {questions: newQuestions, _id: _id} });
                res.status(200).json({ status: 200, data: {questions: newQuestions, _id: _id} });
            } else {
                res.status(304).json({ status: 304, data: result, message: "Question doesn't exist. No change" });
            }
        } else {
            res.status(404).json({ status: 404, data: _id, message: "User not found" });
        }  
        
    } catch (err) {
        console.log(err.stack);
        res.status(500).json({ status: 500, data: req.body, message: err.message });
    }

    client.close()
};

// Endpoints for patching a user
const patchUser = async (req, res) => {
    const _id = req.body._id;
    const userInfo = req.body
    const client = new MongoClient(MONGO_URI, options);

    try {
        await client.connect();
        const db = client.db("StudyPal");
        const result = await db.collection("users").findOne({_id});

        // check if userId exist
        if (result) {
            await db.collection("users").updateOne({ _id }, { $set: userInfo });
            res.status(200).json({ status: 200, data: userInfo, message: "User patched" });
        } else {
            await db.collection("users").insertOne(userInfo);
            res.status(201).json({ status: 201, data: userInfo, message: "User added" });
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
    deleteQuestion,
    patchUser,
};
