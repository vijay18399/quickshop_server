var mongoose = require('mongoose');
var ProductSchema = new mongoose.Schema({
    productimg: {
        type: String,
        required: true,
    },
    owner: {
        type: String,
        required: true,
    },
productname: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
price: {
        type: Number,
        required: true
    },
description: {
        type: String,
        required: true,
    }
});
 
 
module.exports = mongoose.model('Product', ProductSchema);