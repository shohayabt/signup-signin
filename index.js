
const express = require('express')
const app = express()
require('dotenv').config()
const verifyJWT = require('./Middleware/verifyJWT.middleware');
const { connectDB } = require('./utiles/connectDataBase');
const { signup } = require('./Controller/signup.controller');
const { login } = require('./Controller/login.controller');
const { findAllMembers } = require('./Controller/findAllMember.controller');
const port = process.env.PORT || 5000;

// APPLICATIONS MIDDLEWARE
app.use(express.json())
// DATABASE CONNECTION
connectDB();
// GET ALL USERFROM DATABASE 
app.get("/all-members",verifyJWT,findAllMembers)
// SIGNUP || CREATE NEW ACCOUNT 
app.post("/signup",signup)
// USER LOGIN 
app.post('/login',login )
//INITIAL ROUTE
app.get('/', (req, res) => {
    res.send("HELLO WORLD FROM NODE JS || EXPRESS")
})
// SERVER LISTENING 
app.listen(port, () => {
    console.log(`SERVER IS UP - PORT:${port}`)
})