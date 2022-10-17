const express = require('express');
const app = express();
const mongoose = require('mongoose');
app.use(express.json());
const cors = require('cors');
app.use(cors());
const bcrypt = require('bcryptjs');
app.set("view engine", "ejs");
app.use(express.urlencoded({extended: false}));
const hbs = require('nodemailer-express-handlebars');
// const path = require("path");
// const viewpath = path.join(__dirname, "../views");



const jwt = require('jsonwebtoken');
var nodemailer = require('nodemailer');
const { response } = require('express');

const JWT_SECRET ="fafsfafw4124wrwqr#@#fasfasfsafasfsffa4%$@%@%";

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
require("./models/userDetails");
require("./models/topic");
require("./models/lesson");
const Lesson = mongoose.model("Lesson");
const Topic = mongoose.model("Topic");
const User = mongoose.model("UserInfo");

app.get("/topic/:id",async (req, res) => {
    const {id} = req.params;
    const lesson = await Lesson.find({topicId: id});
    const url = await Topic.find({_id:id},{_id: 0,urlLesson: 1});
    res.send([lesson, url]);
})
app.get("/topic",async (req, res)=>{
    const topicL = await Topic.find({id: { $mod: [ 2, 1 ] }});
    const topicR = await Topic.find({id: { $mod: [ 2, 0 ] }});
    // res.send({topicL: topicL, topicR: topicR} );
    // res.send([topicL, topicR] );
    res.send([data1 = topicL, data2 = topicR] );

});

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
        const token = jwt.sign({email: user.email, role: user.role, _id: user._id}, JWT_SECRET, {
            expiresIn: "5h",
        });
        if(res.status(201)){
            return res.json({status : "ok", data : token, role: user.role});
        }else{
            return res.json({error : "error"});
        }
    }
    res.json({status: "error", error: "Invalid password"});
})
app.get("/getRole",async function(req, res) {
    const {token} = req.body;
    const user = jwt.verify(token, JWT_SECRET);
    const userRole = user.role;
    res.send(userRole);

})
app.post("/userData", async (req, res) => {
    const {token} = req.body;
    try{
        const user = jwt.verify(token, JWT_SECRET);
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

app.post('/forgot-password',async (req, res) => {
    const {email} = req.body;
    try{
        const oldUser = await User.findOne({email});
        if (!oldUser){
            return res.json({status: "User not exist!!"});
        }
        const secret = JWT_SECRET + oldUser.password;
        const token = jwt.sign({email: oldUser.email, id: oldUser._id}, secret,{
            expiresIn: "5m",
        });
        const link = `http://localhost:3000/reset-password/${oldUser._id}/${token}`;
        
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: "vielang123@gmail.com",
                pass: "kowgahyxefqtgqxh"
            }
        });

        transporter.use('compile', hbs({
            viewEngine: {
                defaultLayout: false,
            },
            viewPath: './views/'
        }));

    
        var mailOptions = {
            from: 'VieLang',
            to: req.body.email,
            subject: 'Password reset',
            context: {
                name: oldUser.name,
                link: link
            },
            attachments:[{
                filename: 'image-2.png',
                path:  './views/images/image-2.png',
                cid: 'image-2'
            },
            {
                filename: 'email.png',
                path:   './views/images/email.png',
                cid: 'email'
            },
            {
                filename: 'image-3.png',
                path: './views/images/image-3.png',
                cid: 'image-3'
            },
            {
                filename: 'image-1.png',
                path:  './views/images/image-1.png',
                cid: 'image-1'
            },
            {
                filename: 'image-4.png',
                path:  './views/images/image-4.png',
                cid: 'image-4'
            },
            {
                filename: 'image-6.png',
                path:  './views/images/image-6.png',
                cid: 'image-6'
            },

        ],
            template: 'email'
        };
        
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
            console.log(error);
            } else {
            console.log('Email sent: ' + info.response);
            }
        });
        
    console.log(link);
    }catch(error){}
});
// app.get('/userRole/:id', async (req, res) =>{
//     const {id} = req.params;
//     const oldUser = await User.findOne({_id: id});
//     if (!oldUser){
//         return res.json({status: "User not exists!!"});
//     }
//     res.send({role: oldUser.role});
// })

app.get('/reset-password/:id/:token', async (req, res) => {
    const {id, token} =req.params;
    console.log(req.params);
    const oldUser = await User.findOne({_id: id});
    if (!oldUser){
        return res.json({status: "User not exists!!"});
    }
    const secret = JWT_SECRET + oldUser.password;
    try{
        const verify = jwt.verify(token, secret);
        res.send({email: verify.email, status: "Not Verrifed"})
    }catch(error){
        res.send("Not Verrifed")
    }
})

app.post('/reset-password/:id/:token', async (req, res) => {
    const {id, token} =req.params;
    const {password} = req.body;
    console.log(req.params);
    const oldUser = await User.findOne({_id: id});
    if (!oldUser){
        return res.json({status: "User not exists!!"});
    }
    const secret = JWT_SECRET + oldUser.password;
    try{
        const verify = jwt.verify(token, secret);
        const encryptedPassword = await bcrypt.hash(password,10);
        await User.updateOne({
            _id: id
        },{
            $set:{
                password: encryptedPassword,
            }
        })
        .then(() => {
            res.send({email: verify.email, status:"verified"})
        })
        .catch((error) =>{
            res.send({status:"Not Verrifed", email: error })
        });
    }catch(error){
        res.send("Not Verrifed")
    }
})
    
app.listen(5000, ()=>{
        console.log("Server started");
    })