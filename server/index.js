const express = require('express');
const PORT = 4000;

express()

    .get("/", (req,res) => {
        res.status(200).json({status: 200, message: "hello!"});
    })


    .listen(PORT, () => console.log(`Listening on port ${PORT}`));
