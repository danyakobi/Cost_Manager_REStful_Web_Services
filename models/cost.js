const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const db = require('../db/mongoose');


let costsSchema = new Schema({
    description: {type: String, required: true, max: 100},
    sum: {type: Number, required: true},
    category: {type: String, required: true, max: 100},
    date: {type: String, required: true},
    owner: {type: String, required: true}

});



// Export the models
module.exports = mongoose.model('cost', costsSchema);



