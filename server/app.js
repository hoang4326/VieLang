const express = require('express');
const app = express();
const mongoose = require('mongoose');
app.use(express.json());
const cors = require('cors');
app.use(cors());
const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');
const JWT_SECRET ="fafsfafw4124wrwqr#@#fasfasfsafasfsffa4%$@%@%";

const mongoUrl = 
    "mongodb://hoang4326:hoang190506@ac-ibx7lch-shard-00-00.jh8v5og.mongodb.net:27017,ac-ibx7lch-shard-00-01.jh8v5og.mongodb.net:27017,ac-ibx7lch-shard-00-02.jh8v5og.mongodb.net:27017/test?replicaSet=atlas-1mz6xt-shard-0&ssl=true&authSource=admin"

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
    const {name, email, username, password, role } = req.body;

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
            role
            
        });
    res.send({status:"ok"});
    }catch(error){
        res.send({status:"error"});
    }
});

app.post("/login",async(req,res)=>{
    const {email, password} = req.body;

    const user = await User.findOne({email});

    if(!user){
        return res.json({error:"User not found"});
    }
    if ( await bcrypt.compare(password, user.password) ){
        const token = jwt.sign({email: user.email}, JWT_SECRET);
        if(res.status(201)){
            return res.json({status : "ok", data : token});
        }else{
            return res.json({error : "error"});
        }
    }
    res.json({status: "error", error: "Invalid password"});
})

app.post("/userData", async (req, res) => {
    const {token} = req.body;
    try{
        const user = jwt.verify(token, JWT_SECRET);
        console.log(user);
        const useremail = user.email;
        User.findOne({email:useremail})
        .then((data) =>{
            res.send({status:"ok",data: data});
        })
        .catch((error) => {
            res.send({status:"error",data: error});
        });
    }
    catch(error){

    }
});
    
app.listen(5000, ()=>{
        console.log("Server started");
    })