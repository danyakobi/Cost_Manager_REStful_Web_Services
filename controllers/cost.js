const Cost = require('../models/cost');
const db = require('../db/mongoose');
const Buyer = require('../models/buyer');
const {ObjectId} = require("mongodb");
const {get} = require("mongoose");
const {save} = require("debug");
var mongoClient = require('mongodb').MongoClient;
// create a new Cost ,assign a cost to the owner(user) and add the sum to totalCosts.
exports.costCreate =function (req, res) {

    if (!req.body.description || !req.body.sum || !req.body.category) {
        return res.status(400).send({
            success: false,
            message: "Please enter cost description sum, category "
        });
    }
    Buyer.findOne({email: req.body.owner}, function (err, obj) {
        //Buyer.find().sort({categor}) sort by category
        if (obj == null) {
            return res.status(400).send({
                success: false,
                message: "Please register to user this service"
            });
        } else {
            obj.totalCosts = req.body.sum +obj.totalCosts;
            obj.save();
            const tempDate = new Date();
            let  month = tempDate.getMonth()+1;
            let dateNow =tempDate.getFullYear()+"-" + month;
            //let setDate = new Date(); change the date by setDate
            let cost = new Cost(
                {
                    description: req.body.description,
                    sum: req.body.sum,
                    category: req.body.category,
                    date: dateNow,
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
        }

    });

}
// find all costs of specific buyer(email).
exports.allCostbyBuyer = (req, res) => {
        Cost.find({owner:req.params.email})
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

// find all costs of specific buyer(email) and filter with moth and year
exports.allCostbyBuyerFilterDate = (req, res) => {
    Cost.find({owner:req.params.email,date: req.params.date},)
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

