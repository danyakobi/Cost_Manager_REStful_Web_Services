const Cost = require('../models/cost');
const db = require('../db/mongoose');
const User = require('../models/user');


// create a new Cost.
exports.costCreate = function (req, res) {
    // validate request
    if (!req.body.description || !req.body.sum || !req.body.category) {
        return res.status(400).send({
            success: false,
            message: "Please enter cost description, sum and category"
        });
    }
    //validate user
        const tempUser = User.findOne(req.body.owner)
        console.log("XXXXXXXXXXXXXXXXXXXXXXXXX");
        if (tempUser.findOne()) {
        return res.status(400).send({
            success: false,
            message: "you dont have access! you have to register for service"
        });
    }

    // constructor
    // we need to check if user exist in system --- if not he couldnt create cost
    let cost = new Cost(
        {
            description: req.body.description,
            sum: req.body.sum,
            category: req.body.category,
            date: Date.now(),
            owner: req.body.owner

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
    exports.allCosts = (req, res) => {
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
    exports.costDetails = (req, res) => {
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
exports.costUpdate = (req, res) => {
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
exports.costDelete = (req, res) => {
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



