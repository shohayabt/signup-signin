const Member = require("../Model/member.model")
module.exports.findAllMembers = async (req,res)=>{
   const members = await Member.find({}).select("-password")
   res.status(200).json({"message":`Hello! ${req.name}`,"data": members})
}