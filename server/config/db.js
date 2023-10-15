const mongoose = require('mongoose');


const connectDb = () => {
    try {
        mongoose.connect(process.env.MONGODB_URL);
        console.log("Database Connection Successfully ")
    } catch (error) {
        console.log('Connect Fallure!!!!!', error)
    }
}

module.exports = connectDb;


/* const { MongoClient, ServerApiVersion } = require('mongodb');

const client = new MongoClient("mongodb+srv://admin:AqUKxuR0mKYiydFk@cluster0.wsfxvzz.mongodb.net/?retryWrites=true&w=majority/live-chat", {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        await client.connect();
        console.log("Database connected");
    } finally {
        await client.close();
    }
}
run().catch(console.dir); */
