const express = require('express');
const router = express.Router();

// include cost controller
const cost_controller = require('../controllers/cost');

// routes
router.get('/', cost_controller.all_costs);
router.post('/create', cost_controller.cost_create);
router.get('/:id', cost_controller.cost_details);
router.put('/update/:id', cost_controller.cost_update);
router.delete('/delete/:id', cost_controller.cost_delete);

module.exports = router;