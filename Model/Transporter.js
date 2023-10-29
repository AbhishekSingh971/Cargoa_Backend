const mongoose = require('mongoose')

const transporterSchema  = new mongoose.Schema({
    manufacturerId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'manufacturer'
    },
    price:{
        type: Number,
        require: true,
    },
    message:{
        type: String,
    }
});

module.exports = mongoose.model('transporter', transporterSchema);