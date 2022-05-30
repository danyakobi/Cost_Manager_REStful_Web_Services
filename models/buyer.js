const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const db = require('../db/mongoose');
const {ObjectID, ObjectId} = require("mongodb");
const Buyer = require("../models/buyer.js")

let buyersSchema = new Schema({
    id: {type: String,required :true},
    firstName: {type: String, required: true, max: 100},
    lastName: {type: String, required: true, max: 100},
    birthday: {type: String, required: true, max: 100},
    maritalStatus: {type: String, required: true, max: 100},
    totalCosts: {type: Number, required: true},
    email: {type: String, required: true, max:35}

});



// Export the models
const buyer = module.exports = mongoose.model('buyers', buyersSchema);

