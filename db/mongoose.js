const mongoose = require("mongoose");
const {connection} = require("mongoose");
const Cost = require('../models/cost');
const uri ='mongodb+srv://Admin90:Admin90@cluster0.obn8t.mongodb.net/CostManagerServerSide'
const connectDB = async () => {
    try {
       let connection= await mongoose.connect(uri, {

           /*
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: true,
           */
           //



        });

        console.log('MongoDB connected!!');
    } catch (err) {
        console.log('Failed to connect to MongoDB', err);
    }
};
connectDB();

