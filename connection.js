const mongoose = require("mongoose")
const url = "mongodb://127.0.0.1:27017/newDB"
mongoose.connect(url);

const db = mongoose.connection;
db.on("connected", ()=>{
    console.log("db connected");
})
db.on("disconnected", ()=>{
    console.log("disconnected")
})
db.on("error", (error)=>{
    console.log("error:-",error);
})

module.exports = db