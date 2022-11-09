const bcrypt = require('bcrypt');
const Member = require("../Model/member.model")
module.exports.signup =  async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10,)
        const newMember = await new Member({
            ...req.body,
            "password": hashedPassword
        }) 
        const savedMember = await newMember.save()
        try{
            res.status(200).json({
                "status": "successfull",
                "message":"Your account created successfully! check your email to verify your account. Thankyou!"
            },)
        }catch(error){
            console.log(error)
            res.status(500).json({
                "status":"faild",
                "message": error.message
            })
        }

    } catch {
        res.status(500).json({
            "status": "faild",
            "message": "faild to create a new user!"
        })
    }
}