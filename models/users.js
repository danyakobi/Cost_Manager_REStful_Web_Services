const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let usersSchema = new Schema({
    id: {type: String, required: true, max: 100},
    first_name: {type: String, required: true, max: 100},
    last_name: {type: String, required: true, max: 100},
    birthday: {type: String, required: true, max: 100},
    marital_status: {type: String, required: true, max: 100},
    category: {type: String, required: true, max: 100},

});

// Export the models
module.exports = mongoose.model('cost', usersSchema);

