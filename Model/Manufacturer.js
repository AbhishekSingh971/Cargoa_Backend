const mongoose = require('mongoose');

const manufacturerSchema  =mongoose.Schema({
    userId: {
        type : mongoose.Schema.Types.ObjectId,
        ref: `Users`
      },
    to:{
        type: String,
        require: true,
    },
    from:{
        type: String,
        require: true
    },
    quantity:{
        type: Number,
        require: true
    },
    transporter:{
        type: mongoose.Schema.Types.ObjectId,
        ref :'Users',
    }
},{timestamps: true});

module.exports = mongoose.model('manufacturer', manufacturerSchema);