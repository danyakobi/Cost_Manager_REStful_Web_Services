const Buyer = require('../models/buyer');
const Cost = require("../models/cost");
const db = require("../db/mongoose");


// create a new buyer and check if the user already exists
exports.buyerCreate = function (req, res) {
    // validate request
    if (!req.body.firstName || !req.body.lastName || !req.body.birthday || !req.body.maritalStatus || !req.body.email) {
        return res.status(400).send({
            success: false,
            message: "Please enter user firstName, lastName, birthday, maritalStatus, email"
        });
    }
    Buyer.findOne({email: req.body.email}, function (err, obj) {
        if (obj != null) {
            return res.status(400).send({
                success: false,
                message: "The user already exists"
            });
        } else {


            let buyer = new Buyer(
                {
                    id: req.body.id,
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    birthday: req.body.birthday,
                    maritalStatus: req.body.maritalStatus,
                    email: req.body.email,
                    totalCosts: 0
                }
            );

            buyer.save()
                .then(data => {
                    res.send({
                        success: true,
                        message: 'user successfully created',
                        data: data
                    });
                }).catch(err => {
                res.status(500).send({
                    success: false,
                    message: err.message || "Some error occurred while creating the user."
                });
            });
        }

    });

};

// details of buyer by email
exports.buyerDetails = function (req,res){
    console.log(req.param.email)
    Buyer.find({email:req.params.email})
        .then(data => {
            if(data==""|| !data) {
                return res.status(404).send({
                    success: false,
                    message: "Buyer not found with email " + req.params.email
                });
            }
            res.send({
                success: true,
                message: 'Buyer successfully retrieved',
                data: data
            });
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                success: false,
                message: "Buyer not found with email " + req.params.email
            });
        }
        return res.status(500).send({
            success: false,
            message: "Error retrieving buyer with email " + req.params.email
        });
    });
}

//details of all buyer
exports.allBuyers = function (req,res){
    Buyer.find(req.param.email)
        .then(data => {
            console.log(data);
            if(!data) {
                return res.status(404).send({
                    success: false,
                    message: "User not found with email " + req.param.email
                });
            }
            res.send({
                success: true,
                message: 'User successfully retrieved',
                data: data
            });
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                success: false,
                message: "User not found with email " + req.body.email
            });
        }
        return res.status(500).send({
            success: false,
            message: "Error retrieving user with email " + req.body.email
        });
    });
}






