var mongoose = require('mongoose');
require('dotenv').config();

async function dbConnect() {
    try {
        mongoose.set("strictQuery", true);
        await mongoose.connect(process.env.DB_URL);
        console.log("connected to mongoDB");
    } catch (err) {
        console.error(err);
    }

}

module.exports = dbConnect;