
const mongoose = require("mongoose");

mongoose.connect('mongodb+srv://Admin90:Admin90@cluster0.obn8t.mongodb.net/CostManagerServerSide',{
    // permission DB
}).then(()=> console.log('DB connected successfully.')
).catch(err => console.log('DB connection failed ' + err))
