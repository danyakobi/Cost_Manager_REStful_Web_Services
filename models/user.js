const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let usersSchema = new Schema({
    id: {type: String, required: true, max: 100},
    firstName: {type: String, required: true, max: 100},
    lastName: {type: String, required: true, max: 100},
    birthday: {type: String, required: true, max: 100},
    maritalStatus: {type: String, required: true, max: 100},
    totalCosts: {type: Number, required: true},
    email: {type: String, required: true, max:35}

});

// Export the models
module.exports = mongoose.model('users', usersSchema);

