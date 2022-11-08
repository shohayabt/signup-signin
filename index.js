
const express = require('express')
const app = express()
require('dotenv').config()
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const { userSchema } = require('./schema/userSchema');
const port = process.env.PORT || 5000;

app.use(express.json())
// Mongoose Connection
mongoose.connect(`mongodb+srv://${process.env.MONGODB_AUTH}@cluster0.grtxn.mongodb.net/memberCollection?retryWrites=true&w=majority`)
.then(()=>{
    console.log("Database Connected")
})
.catch((error)=>{
    console.log(error)
})
// Mongoose Model
const Member = new mongoose.model("Member",userSchema)
// const isUserOrNot = async (req, res, next)=>{
//     try{
//         const token = req.headers.authorization
//         if (!token) {
//             return res.status(401).send({ info: "Invalid user!" });
//           }
//         const useableToken = await token.split(" ")[1]
//         const verified = jwt.verify(useableToken,process.env.JWT_KEY)
//         if(verified){
//             next()
//         }else{
//             next("Bad request! user is not verified!")
//         }
        
//     }catch{
//         next("someting went wrong!")
//     }
// }

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).send({ info: "invalid user" });
    }
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN, function (err, decoded) {
      if (err) {
        return res.status(403).send({ info: "invalid user" });
      }
      req.decoded = decoded;
      next();
    });
  };
app.get("/database",verifyJWT, async(req,res)=>{
    res.send("Hello Error")
})
app.post("/signup", async (req, res) => {
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
                'message':{
                    ...savedMember,
                    'password':undefined
                }
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
})
app.post('/login', async (req, res) => {
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
})
app.get('/', (req, res) => {
    res.send("HELLO WORLD FROM NODE JS || EXPRESS")
})

app.listen(port, () => {
    console.log(`SERVER IS UP - PORT:${port}`)
})