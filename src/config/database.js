const mongoose = require('mongoose')

function connectDB(){
    mongoose.connect(process.env.Mongo_URI)
    .then(()=>{
        console.log("connect to DB");
        
    })
    .catch(err =>{
        console.log("Error connected to DB");
        
    })
}

module.exports = connectDB