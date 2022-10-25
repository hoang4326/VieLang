const express = require('express'),
    multer = require('multer'),
    mongoose = require('mongoose'),
    uuidv4 = require('uuid/v4'),
    router = express.Router();

require("../models/userDetails");
require("../models/topic");
require("../models/lesson");

const Lesson = mongoose.model("Lesson");
const Topic = mongoose.model("Topic");
const User = mongoose.model("UserInfo");
    
const DIR = './public/';


router.get("/topic", async (req, res)=>{
    const topic = await Topic.find({},{_id: 0, name: 1});
    res.send(topic);
});

router.post("/addVocab", async (req, res)=>{
    const {topic, vocabEng, vocabVie} = req.body;
    await Topic.findOneAndUpdate({
        'name': topic
    },{
        $push:{
            vocab:
            {
                "vocabVie": vocabVie,
                "vocabEng": vocabEng
            }
        }
    },{
        new: true
    }
    ,function(error){
        res.status(400).json({
            "message": "success"
        })
    }
    )
})  

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName  = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, uuidv4() + '-' + fileName )
    }
});

var upload = multer({
    storage: storage,
    filename: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});

var uploadMultiple = upload.fields([{name: 'imgTopic'},{name: 'imgLesson'} ]);

router.post("/addTopic",uploadMultiple, async (req, res, next) => {
    const url = req.protocol + '://' + req.get('host');
    const vocab = [];
    const countTopic = await Topic.countDocuments({});
    const id = countTopic + 1;
    const name =  req.body.name;
    //Add to array imgTopic
    imgTopic = req.files.imgTopic;
    let fileTopic = imgTopic[0].filename;
    imgTopic.forEach((item) => item.urlImage = url + '/public/' + fileTopic);
    console.log(imgTopic);
    //Add to array imgLesson
    imgLesson = req.files.imgLesson;
    let fileLesson = imgLesson[0].filename;
    imgLesson.forEach((item) => item.urlImage = url + '/public/' + fileLesson);
    console.log(imgLesson);
    try{
        const oldTopic = await Topic.findOne({name});
        if(oldTopic){
            return res.send({status:"Topic exits"});
        }
        await Topic.create({
            name: name,
            topicImg: imgTopic,
            lessonImg: imgLesson,
            id: id,
            vocab: vocab,
        })
    res.send({status:"ok"});
    }catch(error){
        res.send({status:"error"});
        console.log(error);

    }
})


module.exports = router;

