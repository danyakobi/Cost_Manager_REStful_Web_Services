const Cost = require('../models/cost');

// create a new Cost.
exports.cost_create = function (req, res) {
    // validate request
    if (!req.body.description || !req.body.sum) {
        return res.status(400).send({
            success: false,
            message: "Please enter cost description and sum"
        });
    }
    // constructor
    let cost = new Cost(
        {
            description: req.body.description,
            sum: req.body.sum
        }
    );

    cost.save()
        .then(data => {
            res.send({
                success: true,
                message: 'cost successfully created',
                data: data
            });
        }).catch(err => {
        res.status(500).send({
            success: false,
            message: err.message || "Some error occurred while creating the cost."
        });
    });
};

// retrieve and return all costs.
    exports.all_costs = (req, res) => {
        Cost.find()
            .then(data => {
                var message = "";
                if (data === undefined || data.length == 0) message = "No cost found!";
                else message = 'Costs successfully retrieved';

                res.send({
                    success: true,
                    message: message,
                    data: data
                });
            }).catch(err => {
            res.status(500).send({
                success: false,
                message: err.message || "Some error occurred while retrieving costs."
            });
        });
    };

    // find a single cost with a id.
    exports.cost_details = (req, res) => {
        Cost.findById(req.params.id)
            .then(data => {
                if(!data) {
                    return res.status(404).send({
                        success: false,
                        message: "Cost not found with id " + req.params.id
                    });
                }
                res.send({
                    success: true,
                    message: 'Cost successfully retrieved',
                    data: data
                });
            }).catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    success: false,
                    message: "Cost not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                success: false,
                message: "Error retrieving cost with id " + req.params.id
            });
        });


};

// update a cost  by the id.
exports.cost_update = (req, res) => {
    // validate request
    if(!req.body.description || !req.body.sum) {
        return res.status(400).send({
            success: false,
            message: "Please enter cost description and sum"
        });
    }

    // find cost and update
    Cost.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, {new: true})
        .then(data => {
            if(!data) {
                return res.status(404).send({
                    success: false,
                    message: "Cost not found with id " + req.params.id
                });
            }
            res.send({
                success: true,
                data: data
            });
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                success: false,
                message: "Cost not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            success: false,
            message: "Error updating cost with id " + req.params.id
        });
    });
};

// delete a cost with the specified id.
exports.cost_delete = (req, res) => {
    Cost.findByIdAndRemove(req.params.id)
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    success: false,
                    message: "Cost not found with id " + req.params.id
                });
            }
            res.send({
                success: true,
                message: "Cost successfully deleted!"
            });
        }).catch(err => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                success: false,
                message: "Cost not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            success: false,
            message: "Could not delete cost with id " + req.params.id
        });
    });
};



