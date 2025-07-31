const express = require("express");
const app = express();
const PORT = 8000;
const db = require("./connection");
const bodyParser = require("body-parser");
const User = require("./models/user")

app.use(bodyParser.json());
//home page
app.get("/", (req,res)=>{
    res.send("home page");
})
//create a new user
app.post("/user", async(req,res)=>{
    try{
        const {name,age,email} = req.body;
        const response = await User.create({
            name,
            age,
            email
        });
        return res.status(201).json({response, message: "user created"})
    }
    catch(err){
        console.log(err);
        res.status(400).json({err: "error"});
    }
   
});
//get all users
app.get("/users", async(req,res)=>{
    const result = await User.find({});
    res.status(200).json(result);
});
//get user by userId
app.get("/user/:id", async(req,res)=>{
    const id = req.params.id;
    const response = await User.findOne({_id:id});
    if(!response){
        res.status(404).json({error:"User not found"});
    }
    res.status(201).json(response);
})
//

//server connection
app.listen(PORT,()=>console.log(`server started @...http://localhost: ${PORT}`))