const mongoose = require('mongoose');
require('dotenv').config({path: './process.env'});

const url = process.env.MONGODB_URI

const connectDB = async () => {
    try {
        await mongoose.connect(url, {

        });
    } catch (err) {
        console.error('Error connecting to the database: ', err);
        process.exit(1);
    }
};

module.exports = connectDB

