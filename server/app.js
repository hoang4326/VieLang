const express = require('express');
const app = express();
const mongoose = require('mongoose');
app.use(express.json());
const cors = require('cors');
app.use(cors());
app.set("view engine", "ejs");
app.use(express.urlencoded({extended:false}));
app.use('/public', express.static('public'));
const mongoUrl = 
    "mongodb://hoang4326:hoang190506@ac-ibx7lch-shard-00-00.jh8v5og.mongodb.net:27017,ac-ibx7lch-shard-00-01.jh8v5og.mongodb.net:27017,ac-ibx7lch-shard-00-02.jh8v5og.mongodb.net:27017/vielangDatabase?replicaSet=atlas-1mz6xt-shard-0&ssl=true&authSource=admin"
mongoose
    .connect(mongoUrl,{
        useNewUrlParser: true,
    })
    .then(()=>{
        console.log("Connect to database");
    })
    .catch((e)=>console.log(e));
const admin = require("./routes/admin");
const user = require("./routes/user");

app.use('/admin',admin);
app.use('/',user);

app.listen(5000, ()=>{
        console.log("Server started");
    })