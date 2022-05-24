var express = require('express');
var router = express.Router();



const userController = require('../controllers/user')
const {model} = require("mongoose");


//router.get('/', costController.allCosts);
router.post('/create', userController.userCreate);

module.exports = router;