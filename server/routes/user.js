const express = require('express'),
    mongoose = require('mongoose'),
    router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const path = require('path');
const JWT_SECRET ="fafsfafw4124wrwqr#@#fasfasfsafasfsffa4%$@%@%";

require("../models/userDetails");
require("../models/topic");
require("../models/lesson");
require("../models/question");


const Lesson = mongoose.model("Lesson");
const Topic = mongoose.model("Topic");
const User = mongoose.model("UserInfo");
const Question = mongoose.model("Question");
const Achievement = mongoose.model("Achievement");


router.get("/topic/:name/:id", async (req, res) =>{
    const {id} = req.params;
    const {name} = req.params;
    const data = await Question.find({topic: name, lesson: id},{_id: 0, questions: 1});
    const question = data[0].questions;
    const timeStart =  (new Date).getTime();
    res.send([question, timeStart]);
})

router.get("/topic/:name",async (req, res) => {
    const {name} = req.params;
    const lesson = await Lesson.find({topic: name});
    const url = await Topic.find({name:name},{_id: 0,lessonImg: 1});
    const vocab = await Topic.find({name:name},{_id: 0,vocab: 1 });
    const topic = await Topic.find({name:name},{_id: 0,name: 1 });

    res.send([lesson, url, vocab, topic]);
})
router.get("/topic",async (req, res)=>{
    const topicL = await Topic.find({id: { $mod: [ 2, 1 ] }});
    const topicR = await Topic.find({id: { $mod: [ 2, 0 ] }});
    // res.send({topicL: topicL, topicR: topicR} );
    // res.send([topicL, topicR] );
    res.send([data1 = topicL, data2 = topicR] );

});

router.post("/do-post", async function (request, result){
    const {topic,lessonId,token, duration } = request.body;
    const decodeToken = jwt.verify(token, JWT_SECRET);
    const userId = decodeToken._id;
    // const {userId} = request.body;
    const time = await  Achievement.find({userId: mongoose.Types.ObjectId(userId)},{_id: 0, totalTime:1});
    let timeArray = time.map(a => a.totalTime);
    const totalTimeBefore = parseInt((timeArray.toString()));
    const totalTime = totalTimeBefore + duration;

    const data = await  Achievement.find({userId: mongoose.Types.ObjectId(userId)},{_id: 0, exp:1});
    let expArray = data.map(a => a.exp);
    const expBefore = parseInt((expArray.toString()));
    const exp = expBefore + 5;

    function getLevel(exp) {
        var level = 0;
        [5, 15, 25, 35, 45, 55, 65, 75, 85, 95, 100].some(function(v, i) {
            level = i;        
            return v > exp; 
        });
        return level;
    }

    await Lesson.findOne({
        "topic" : topic, "id": lessonId
    }, function (error, item){
        if(item.isFinished === null || item.isFinished === undefined){
            Lesson.findOneAndUpdate({
                "topic" : topic, "id": lessonId,
            },{
                $set: {
                    isFinished: 
                        {
                            "_id": userId,
                        },                        
                }
            },{
                new: true
            },function (error){
                return result.json({
                    "status": "success",
                    "message": "UserId has been inserted",
                });
            });
        }else if (item.isFinished.find(e => e._id.toString() === userId)){
            return result.json({
                "status": "error",
                "message": "Already had this UserId"
            });
        }else{
            Lesson.findOneAndUpdate({
                "topic" : topic, "id": lessonId,
            },{
                $push: {
                    isFinished: 
                    {
                        "_id": userId,
                    },
                    
                }
            },{
                new: true
            },function (error){
                return result.json({
                    "status": "success",
                    "message": "UserId has been inserted",
                });
            });  
        }
    }).clone();
    
    await Achievement.findOneAndUpdate({
        "userId": mongoose.Types.ObjectId(userId)
    },{
        $set:{
            "totalTime": totalTime,
            "exp": exp,
            "level": getLevel(exp)
        }
    })
})

router.post("/signup",async(req,res)=>{
    const {name, email, username, password, role } = req.body;
    const totalTime = 0;
    const exp = 0;
    const level = 0;
    const encryptedPassword = await bcrypt.hash(password, 10);
    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        name: name,
        email: email,
        username: username,
        password: encryptedPassword,
        role: role
    })
    try{
        const oldUser = await User.findOne({email});
        if(oldUser){
            return res.send({status:"User exits"});
        }
        await user.save( function(err){
            if (err) return handleError(err);

            const achievement = new Achievement({
                _id: new mongoose.Types.ObjectId(),
                userId: user._id,
                totalTime: totalTime,
                exp: exp,
                level: level,
            });
            achievement.save(function(err){
                if (err) return handleError(err);
            })
        })
        // await User.create({
        //     name,
        //     email,
        //     username,
        //     password:encryptedPassword,
        //     role
            
        // });
    res.send({status:"ok"});
    }catch(error){
        res.send({status:"error"});
    }
});

router.post("/login",async(req,res)=>{
    const {email, password} = req.body;

    const user = await User.findOne({email});
    if(!user){
        return res.json({error:"User not found"});
    }
    if ( await bcrypt.compare(password, user.password) ){
        const token = jwt.sign({email: user.email, role: user.role, _id: user._id}, JWT_SECRET, {
            expiresIn: "5h"
        });
        if(res.status(201)){
            return res.json({status : "ok", data : token, role: user.role});
        }else{
            return res.json({error : "error"});
        }
    }
    res.json({status: "error", error: "Invalid password"});
})
router.get("/getRole",async function(req, res) {
    const {token} = req.body;
    const user = jwt.verify(token, JWT_SECRET);
    const userRole = user.role;
    res.send(userRole);

})
router.post("/userData", async (req, res) => {
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

router.post('/forgot-password',async (req, res) => {
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
            viewPath:  path.resolve(__dirname,'../views')
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
                path:  path.resolve(__dirname,'../views/images/image-2.png'),
                cid: 'image-2'
            },
            {
                filename: 'email.png',
                path:   path.resolve(__dirname,'../views/images/email.png'),
                cid: 'email'
            },
            {
                filename: 'image-3.png',
                path: path.resolve(__dirname,'../views/images/image-3.png'),
                cid: 'image-3'
            },
            {
                filename: 'image-1.png',
                path:  path.resolve(__dirname,'../views/images/image-1.png'),
                cid: 'image-1'
            },
            {
                filename: 'image-4.png',
                path:  path.resolve(__dirname,'../views/images/image-4.png'),
                cid: 'image-4'
            },
            {
                filename: 'image-6.png',
                path:  path.resolve(__dirname,'../views/images/image-6.png'),
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
        res.send({status: 'success'});
    return 
    }catch(error){}
});
// router.get('/userRole/:id', async (req, res) =>{
//     const {id} = req.params;
//     const oldUser = await User.findOne({_id: id});
//     if (!oldUser){
//         return res.json({status: "User not exists!!"});
//     }
//     res.send({role: oldUser.role});
// })

router.get('/reset-password/:id/:token', async (req, res) => {
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

router.post('/reset-password/:id/:token', async (req, res) => {
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
module.exports = router;
