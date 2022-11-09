const mongoose = require('mongoose');
module.exports.connectDB =()=>{mongoose.connect(`mongodb+srv://${process.env.MONGODB_AUTH}@cluster0.grtxn.mongodb.net/memberCollection?retryWrites=true&w=majority`)
.then(()=>{
    console.log("Database Connected")
})
.catch((error)=>{
    console.log(error)
})
}