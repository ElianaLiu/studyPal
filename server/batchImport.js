
const { MongoClient } = require("mongodb");
require("dotenv").config({ path: "./.env" });
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

// import JSON file to Mongodb using fs packge
// reference: https://stackoverflow.com/questions/54587040/import-external-json-file-to-mongodb-using-nodejs-and-mongoose
const fs = require('fs');
// read companies.json
let questionsdata = fs.readFileSync('./data/questions.json');
let questions = JSON.parse(questionsdata);

const batchImport = async () => {
    const client = new MongoClient(MONGO_URI, options);

    try {
        await client.connect();
        const db = client.db("StudyPal");

        await db.collection("questions").insertMany(questions);  
        
        console.log("Success")
    } catch (err) {
        console.log(`message: ${err.message}`);
    }

    client.close()

    
}

batchImport();