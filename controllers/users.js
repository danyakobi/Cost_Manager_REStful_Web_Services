const Cost = require('../models/users');

// create a new users.
exports.users_create = function (req, res) {
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
