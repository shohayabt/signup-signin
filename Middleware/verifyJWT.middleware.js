const jwt = require('jsonwebtoken');
const Member = require('../Model/member.model');
const verifyJWT = async(req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "You must login first!"});
    }
    const token = authHeader.split(" ")[1];
    const verified = await jwt.verify(token, process.env.ACCESS_TOKEN) 
    try{
        if(verified){
             Member.findOne({"email":verified.email},(error,member)=>{
                if(!error){
                    const fullName = `${member.firstName} ${member.lastName}`
                    req.name = fullName
                    next();
                }else{
                    next("Sorry! Something went wrong!")
                }
            })
        }else{
            next("You must login first!");
        }
    }catch(error){
        next("You must login first!");
    }
  };
  module.exports = verifyJWT