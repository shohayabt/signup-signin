 
    const express = require('express')
    const app = express()
    const bcrypt = require('bcrypt');
const saveDataToFileSystem = require('./utiles/saveDataToFileSystem');
const getDataFromFileSystem = require('./utiles/getDataFromFileSystem');
    const port = process.env.PORT || 5000;

    app.use(express.json())
    app.post("/signup",async(req,res)=>{
        try{
            const hashedPassword = await bcrypt.hash(req.body.password, 10,)
            const userInformation = {
            ...req.body,
            "password":hashedPassword
        }
        await saveDataToFileSystem(userInformation)
        res.status(200).json({
            "status":"successfull",
        })
        }catch{
            res.status(500).json({
                "status":"faild",
                "message":"faild to create a new user!"
            })
        }

    })
    app.post('/login', async(req,res)=>{
        try{
        const userFromDataBase = await [getDataFromFileSystem()]
        const user =await userFromDataBase.find((user)=>{return user.userName === req.body.userName})
        const result = await bcrypt.compare(req.body.password,user.password,)
        if(result){
            res.send(`Hello! ${user.firstName} ${user.lastName}`)
        }else{
            res.status(401).send("Login Faild!")
        }
        }catch{
          
        }
    })
    app.get('/', (req , res)=>{
    res.send("HELLO WORLD FROM NODE JS || EXPRESS")
    })

    app.listen(port,()=>{
    console.log(`SERVER IS UP - PORT:${port}`)
    })