const express = require('express');
const PORT = 4000;
const {
    getAllQuestions,
    addQuestion,
    deleteQuestion,
} = require("./Handler");

express()
    .use(express.json())
    // Endpoints for retrieving all questions by user
    .get("/api/all-questions/:userId", getAllQuestions)
    // Endpoints for adding a question
    .post("/api/add-question/:userId", addQuestion)
    // Endpoints for deleting a question
    .delete("/api/delete-question/:userId", deleteQuestion)

    .listen(PORT, () => console.log(`Listening on port ${PORT}`));
