const express = require("express");
const app = express();
const PORT = 8000;
const db = require("./connection");
const bodyParser = require("body-parser");
const User = require("./models/user")

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
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
//update user by userId
app.put("/user/:userId", async(req,res)=>{
    try {
        const userId = req.params.userId;
        const {name,age} = req.body;
        console.log(userId);
        // console.log(userData);
        const user = await User.findOneAndUpdate({_id:userId},{$set:{name, age}},
            {new:true}
        )
        console.log("user",user)
        return res.status(200).json({message: "user updated"});
    } catch (err) {
        console.log(err)
        res.status(500).json({error: "internal server error"})
    }
})

//delete a user
app.delete("/user/:userId", async(req,res)=>{
    const userId = req.params.userId;
    const user = await User.findOneAndDelete({_id:userId});
    console.log(user)
    return res.status(200).json({message: "user deleted"})
})

//server connection
app.listen(PORT,()=>console.log(`server started @...http://localhost: ${PORT}`))