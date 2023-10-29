const mongoose = require('mongoose')

const userSchema =new mongoose.Schema({
    firstName:{
        type: String,
        require: true
    },
    lastName:{
        type: String,
        require: true,
    },
    email:{
        type: String,
        require: true,
        unique: true
    },
    password:{
        type: String,
        require: true
    },
    date:{
        type: Date
    },
    address:{
        type: String,
        require: true
    },
    answer:{
        type: String,
        require: true
    },
    phone:{
        type: String,
        require: true
    },
    role:{
        type: Number,
        require: true
    }
},{timestamps: true});

module.exports = mongoose.model('Users', userSchema);