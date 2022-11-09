const Member = require("../Model/member.model");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
module.exports.login = async (req, res) => {
    try {
        const member = await Member.findOne({"email":req.body.email})
        const result = await bcrypt.compare(req.body.password, member.password,)
        if (result) {
            const jwtToken = await jwt.sign({email: member.email},process.env.ACCESS_TOKEN , { expiresIn: '1h' });
            res.status(200).json({"access_token":jwtToken,"message":`Hello! ${member.firstName} ${member.lastName}`})
        } else {
            res.status(401).send("Login Faild!")
        }
    } catch (error){
        console.log(error)
        res.status(500).send("something went wrong!!")
    }
}