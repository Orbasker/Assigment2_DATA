const dotenv = require('dotenv').config()
// mongodb+srv://orbasker:<password>@cluster0.xymjmlz.mongodb.net/
const mongoose = require('mongoose')
const username = process.env.MONGO_USERNAME
const password = process.env.MONGO_PASSWORD
const cluster = process.env.MONGO_CLUSTER
const dbname = process.env.MONGO_DBNAME
const host = process.env.MONGO_HOST

// lets make sure the special characters are encoded correctly
let urlusername = encodeURIComponent(username)
let urlpassword = encodeURIComponent(password)

const url = `mongodb+srv://${urlusername}:${urlpassword}@cluster0.xymjmlz.mongodb.net/${dbname}`


const connectToMongoDB = async () => {
    try {
        const connection = await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');
        return connection.connection.db;
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        throw error;
    }
};
connectToMongoDB().then((db) => {
    console.log('db is', db);
    // Your code using the connected database goes here
}).catch((error) => {
    // Handle errors if needed
    console.error('Error:', error);
});