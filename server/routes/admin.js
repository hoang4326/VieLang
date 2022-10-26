const express = require('express'),
    multer = require('multer'),
    mongoose = require('mongoose'),
    { v4: uuidv4 } = require('uuid'),
    router = express.Router();

require("../models/userDetails");
require("../models/topic");
require("../models/lesson");
require("../models/question");

const Lesson = mongoose.model("Lesson");
const Topic = mongoose.model("Topic");
const User = mongoose.model("UserInfo");
const Question = mongoose.model("Question");

const DIR = './public/';


router.get("/topic", async (req, res)=>{
    const topic = await Topic.find({},{_id: 0, name: 1});
    res.send(topic);
});

router.get("/topicList", async (req, res)=>{
    const topic = await Topic.find({},{"_id": 1, "name": 1, "topicImg.urlImage": 1,"topicImg.originalname" : 1, "lessonImg.urlImage": 1,"lessonImg.originalname" : 1, "vocab": 1});
    res.send(topic);
});

router.post("/deleteVocabulary", async (req, res) => {
    const {id, name} = req.body;
    const vocab = await Topic.find({name: name},{_id: 0, vocab: 1});
})

router.get("/getVocabulary", async (req, res) => {
    const vocabArr = await Topic.find({name: "Basic 1"},{_id: 0, vocab: 1});
    const vocab = vocabArr[0].vocab;
    const vocabNew = vocab.splice(0, 1);
    res.send(vocab);
})

router.post("/deleteTopic", async (req, res)=>{
    const {name} = req.body;
    await Topic.deleteOne({name: name});
    await Lesson.deleteMany({topic: name});
    await Question.deleteMany({topic: name});
    const topic = await Topic.find({},{"_id": 1, "name": 1, "topicImg.urlImage": 1, "lessonImg.urlImage": 1, "vocab": 1});

    res.send({status: "success", data: topic})
})

router.post("/addVocab", async (req, res)=>{
    const {select, vocabEng, vocabVie} = req.body;
    try{
        await Topic.updateOne({
            name: select
        },{
            $push:{
                vocab:
                {
                    "vocabVie": vocabVie,
                    "vocabEng": vocabEng
                }
            }
        })
        res.status(200).json({status: "Sucess"});
    }catch(error){
        res.status(500).json({status:'Error'})
    }

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
    //Add to array imgLesson
    imgLesson = req.files.imgLesson;
    let fileLesson = imgLesson[0].filename;
    imgLesson.forEach((item) => item.urlImage = url + '/public/' + fileLesson);
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

