const User = require('../models/user');
const Cost = require("../models/cost");


// create a new users.
exports.userCreate = function (req, res) {
    // validate request
    if (!req.body.firstName || !req.body.lastName || !req.body.birthday || !req.body.maritalStatus || !req.body.email) {
        return res.status(400).send({
            success: false,
            message: "Please enter user firstName, lastName, birthday, maritalStatus, email"
        });
    }
    // constructor

    let user = new User(
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

    user.save()
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



/*

    console.log("About to check for name and pw");
    Mongo.connect('mongodb://127.0.0.1:27017/main', function(err, db) {
        if(err) throw err;
        var collection = db.collection('users');

// does user exist
        collection.findOne({name : name}, function(err,doc){
            if(err) throw err;
            if(doc)
                console.log("Found: "+name+", pass="+doc.pass);
            else
                console.log("Not found: "+name);
            db.close();
        });

// retrieve and return all costs.
        exports.findBuyer = (req, res) => {
            User.findOne({email: email}, function (err, doc){
                if(err) throw err;
                if(doc){
                    console.log("Found: "+name+", pass="+doc.pass);  <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
                }

            }
        })
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


*/

    };




