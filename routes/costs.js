const express = require('express');
const router = express.Router();

// include cost controller
const costController = require('../controllers/cost');

// routes
router.get('/:email', costController.allCostbyBuyer);
router.get("/:email/:date",costController.allCostbyBuyerFilterDate); // the struct of temp is year-month
router.post('/create', costController.costCreate);
router.get('/:id', costController.costDetails);


module.exports = router;