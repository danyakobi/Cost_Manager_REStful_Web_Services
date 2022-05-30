const express = require('express');
const router = express.Router();

// include cost controller
const costController = require('../controllers/cost');

// routes
router.get('/:email', costController.allCostbyBuyer);
router.post('/create', costController.costCreate);
router.get('/:id', costController.costDetails);
router.put('/update/:id', costController.costUpdate);
router.delete('/delete/:id', costController.costDelete);

module.exports = router;