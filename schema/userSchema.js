const mongoose = require("mongoose")
module.exports.userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        require:true
    },
    lastName:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique: true,
    },
    password:{
        type:String,
        require:true
    },
    userName:{
        type:String,
        require:true,
        unique: true,
    }
})