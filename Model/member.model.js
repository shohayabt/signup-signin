const mongoose = require("mongoose")
userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        require:true,
        trim:true
    },
    lastName:{
        type:String,
        require:true,
        trim:true
    },
    email:{
        type:String,
        require:true,
        unique: true,
        trim:true
    },
    password:{
        type:String,
        require:true,
        trim:true
    },
    userName:{
        type:String,
        require:true,
        unique: true,
        trim:true
    }
},
{
    timestamps: false
}
)
const Member = new mongoose.model("Member",userSchema)
module.exports = Member