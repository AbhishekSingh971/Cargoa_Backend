const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const connectDB =async ()=>{
    try {
        mongoose.set('strictQuery', false);
        const conn = await mongoose.connect(process.env.CONNECTION_STRING);
        console.log(`Connected To Database ${conn.connection.host}`);
    } catch (error) {
        console.log(`Error in Connecting Database ${error}`);
    }
} 

module.exports = connectDB;