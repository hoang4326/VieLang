const express = require('express');
const app = express();
const mongoose = require('mongoose');
app.use(express.json());

const mongoUrl = 
    "mongodb+srv://hoang4326:hoang190506@vielang-project.jh8v5og.mongodb.net/test"

mongoose
    .connect(mongoUrl,{
        useNewUrlParser: true,
    })
    .then(()=>{
        console.log("Connect to database");
    })
    .catch((e)=>console.log(e));

require("./userDetails");

const User = mongoose.model("UserInfo");
app.post("/signup",async(req,res)=>{
    const {name, email, username, password } = req.body;
    try{
        await User.create({
            name,
            email,
            username,
            password,
            
        })
    }catch(error){
        
    }
})

    
    app.listen(5000, ()=>{
        console.log("Server started");
    })