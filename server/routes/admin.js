const { json } = require('express');

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

//lesson

router.get("/lessonList", async (req, res)=>{
    const lesson = await Lesson.find({},{_id: 1, topic: 1, content1 :1, content2 : 1});
    res.send(lesson);
});

// topic
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
    const vocabArr = await Topic.find({name: name},{_id: 0, vocab: 1});
    const vocab = vocabArr[0].vocab;
    vocab.splice(id, 1);
    await Topic.updateOne({name: name },
    {
        $set:{
            vocab: vocab
        }
    })
    res.send({status: 'success'})
})

router.post("/updateLessonImg",upload.single('lessonImg'),  async (req, res) => {
    const file = req.file.filename;
    const name =  req.body.name;
    const vocab = JSON.parse(req.body.vocab);
    const id = req.body.id;
    const url = req.protocol + '://' + req.get('host');
    try{
        await Topic.updateOne({_id: id},{
            $set:{
                name: name,
                lessonImg: {
                    urlImage: url + '/public/' + file
                },
                vocab: vocab
            }
        })
    }catch(error){
        res.send({status:"error"});
        console.log(error);
    }

})

router.post("/updateTopicImg",upload.single('topicImg'),  async (req, res) => {
    const file = req.file.filename;
    const name =  req.body.name;
    const vocab = JSON.parse(req.body.vocab);
    const id = req.body.id;
    const url = req.protocol + '://' + req.get('host');
    try{
        await Topic.updateOne({_id: id},{
            $set:{
                name: name,
                topicImg: {
                    urlImage: url + '/public/' + file
                },
                vocab: vocab
            }
        })
    }catch(error){
        res.send({status:"error"});
        console.log(error);
    }

})

router.post("/updateTopic", async (req, res) => {
    const {name, id} =  req.body;
    console.log(name);
    const {vocab} = req.body;
    console.log(vocab);
    await Topic.updateOne({_id: id},{
        $set:{
            name: name,
            vocab: vocab
        }
    })
    res.send({status: 'success'})
})


router.post("/updateImg",uploadMultiple, async (req, res) => {
    const name =  req.body.name;
    const vocab = JSON.parse(req.body.vocab);
    const id = req.body.id;
    console.log(name);
    console.log(vocab);
    const url = req.protocol + '://' + req.get('host');
    //Add to array imgTopic
    imgTopic = req.files.imgTopic;
    let fileTopic = imgTopic[0].filename;
    imgTopic.forEach((item) => item.urlImage = url + '/public/' + fileTopic);
    //Add to array imgLesson
    imgLesson = req.files.imgLesson;
    let fileLesson = imgLesson[0].filename;
    imgLesson.forEach((item) => item.urlImage = url + '/public/' + fileLesson);
    try{
        await Topic.updateOne({_id: id},{
            $set:{
                name: name,
                topicImg: imgTopic,
                lessonImg: imgLesson,
                vocab: vocab,
            }
        })
        res.send({status: 'success'})
    }catch(error){
    res.send({status:"error"});
    console.log(error);

}

})

router.post("/deleteTopic", async (req, res)=>{
    const {name} = req.body;
    await Topic.deleteOne({name: name});
    await Lesson.deleteMany({topic: name});
    await Question.deleteMany({topic: name});
    const topic = await Topic.find({name: name},{"_id": 1, "name": 1, "topicImg.urlImage": 1, "lessonImg.urlImage": 1, "vocab": 1});

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

