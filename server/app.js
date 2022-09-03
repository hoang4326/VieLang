const express = require('express');
const app = express();
const mongoose = require('mongoose');
app.use(express.json());
const cors = require('cors');
app.use(cors());
const bcrypt = require('bcryptjs');

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

    const encryptedPassword = await bcrypt.hash(password, 10);
    try{
        const oldUser = await User.findOne({email});
        if(oldUser){
            return res.send({error:"User exits"});
        }
        await User.create({
            name,
            email,
            username,
            password:encryptedPassword,
            
        });
    res.send({status:"ok"});
    }catch(error){
        res.send({status:"error"});
    }
});

    
    app.listen(5000, ()=>{
        console.log("Server started");
    })