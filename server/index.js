const express = require('express');
const PORT = 4000;
const {
    getAllQuestions,
} = require("./Handler");

express()

    // Endpoints for retrieving all questions
    .get("/api/all-questions", getAllQuestions)


    .listen(PORT, () => console.log(`Listening on port ${PORT}`));
