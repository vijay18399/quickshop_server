var mongoose = require('mongoose');
var OrderSchema = new mongoose.Schema({
 customer: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
cart: {
        type: Array,
        required: true
    },
cart_price: {
        type: Number,
        required: true
    },
    payment: {
        type: String,
        required: true
    },
description: {
        type: String,
        required: true
    }
});
 
 
module.exports = mongoose.model('Order', OrderSchema);