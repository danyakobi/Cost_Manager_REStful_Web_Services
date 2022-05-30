var express = require('express');
var router = express.Router();



const userController = require('../controllers/buyer')
const {model} = require("mongoose");


//router.get('/', costController.allCosts);
router.post('/create', userController.buyerCreate);
router.get("/details/:email",userController.buyerDetails);
router.get("/",userController.allBuyers);

module.exports = router;