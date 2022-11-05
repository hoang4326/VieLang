var fs = require('fs');

const express = require('express'),
    multer = require('multer'),
    mongoose = require('mongoose'),
    { v4: uuidv4 } = require('uuid'),
    router = express.Router();
const bcrypt = require('bcryptjs');
const { response } = require('express');

require("../models/userDetails");
require("../models/topic");
require("../models/lesson");
require("../models/question");

const Lesson = mongoose.model("Lesson");
const Topic = mongoose.model("Topic");
const User = mongoose.model("UserInfo");
const Question = mongoose.model("Question");
const Achievement = mongoose.model("Achievement");

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

const uploadArray = multer();

var uploadQuestion = upload.fields([{ name: 'answerImg1'}, { name: 'answerImg2' }, { name: 'answerImg3',}, { name: 'answerImg4' }])

//User

router.get('/user', async (req, res) => {
    const user = await User.find({}).sort({role:1});
    res.send(user);
})

router.post('/addUser', async (req, res) => {
    const {name, email, username, password, role} = req.body;
    const encryptedPassword = await bcrypt.hash(password, 10);
    const lessonDone = [];
    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        name: name,
        email: email,
        username: username,
        password: encryptedPassword,
        role: role,
        lessonDone: lessonDone
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
                name: name,
                email: email,
                totalTime: 0,
                exp: 0,
                level: 0,
                percentLessonDone: 0,
                achievement: 0
            });
            achievement.save(function(err){
                if (err) return handleError(err);
            })
        })
    res.send({status:"success"});
    }catch(error){
        res.send({status:"error"});
    }
})

router.post('/updateUser', async (req, res)=>{
    const {name, email, username, role, id} = req.body;
    try{
        const oldUser = await User.findOne({email});
        if(oldUser){
            return res.send({status:"User exits"});
        }
        await User.findOneAndUpdate({_id: mongoose.Types.ObjectId(id)},{
            name: name,
            email: email,
            role: role,
            username: username
        })
        await Achievement.findOneAndUpdate({userId: mongoose.Types.ObjectId(id)},{
            name: name,
            email: email,
        })
        res.send({status: 'success'})
    }catch(error){
        res.send({status: 'error'})
        console.log(error)
    }
})

router.post('/deleteUser', async (req, res) => {
    try{
        const {id} = req.body;
        await User.deleteOne({_id: mongoose.Types.ObjectId(id)});
        await Achievement.deleteOne({userId: mongoose.Types.ObjectId(id)});
        res.send({status: 'success'})
    }catch(error){
        res.send({status: 'error'})
    }
})


//question

router.get('/questionList', async (req, res) => {
    const question = await Question.find({}).sort({ topic: 1});
    res.send(question)
})

router.post('/questionByName', async (req, res) => {
    const {topic, lesson, questionText} = req.body;
    const question = await Question.find({ topic: topic, lesson: lesson},{
        questions: {
            $elemMatch: {
                questionText: questionText
            }
        }
    })
    myArray = question[0].questions.find(a => a.questionText === questionText)
    res.send(myArray);
})

router.post('/questionDelete', async (req, res) => {
    const {topic, lesson, questionText} = req.body;

    // const pathQuestion = await Question.find({topic: topic, lesson: lesson, questions: {$elemMatch:{questionText: questionText}}},
    //     {"_id": 0, "topicImg.path": 1 });
    // const pathTopicDelete = (pathQuestion.topicImg[0]).path;
    // await fs.unlinkSync(pathTopicDelete);

    try{
        await Question.findOneAndUpdate({topic: topic, lesson: lesson},{
            $pull: {
                questions:{
                    questionText: questionText
                }
            }
        })
        res.send({status: "success"})
    }catch(err){
        res.send({status: "error"})
    }
})

router.post("/updateQuestion",uploadQuestion, async (req, res) => {
    const url = req.protocol + '://' + req.get('host');
    const data = req.body
    const topic = data.topic;
    const id = data.id;
    const type = data.type;
    const lesson = data.lesson;
    const questionText = data.questionText;
    const isCorrect = req.body.isCorrect.map(e => JSON.parse(e));
    var answerOptions = [];
    let answerImg1 = req.files.answerImg1;
    let answerImg2 = req.files.answerImg2;
    let answerImg3 = req.files.answerImg3;
    let answerImg4 = req.files.answerImg4;
    if(type === 'Text + Image'){
        if(answerImg1 === undefined){ answerImg1 = JSON.parse(req.body.answerImg1[0]);}
        if(answerImg2 === undefined){ answerImg2 = JSON.parse(req.body.answerImg2[0]);}
        if(answerImg3 === undefined){ answerImg3 = JSON.parse(req.body.answerImg3[0]);}
        if(answerImg4 === undefined){ answerImg4 = JSON.parse(req.body.answerImg4[0]);}
    }
    if (type === 'Text + Image'){
        let answerImgBefore = [answerImg1, answerImg2, answerImg3, answerImg4];
        answerImgBefore.map(item => {
            return item = item.filter(function(a){
                delete a.fieldname;
                delete a.encoding;
                delete a.mimetype;
                delete a.destination;
                delete a.size;
                return true;
            })
        })
        const answerImg = answerImgBefore.map(e => 
                e.map(item => ({...item, urlImage: url + '/public/' + item.filename})));
        for (var i = 0; i < 4; i++) {
            answerOptions.push({
                answerText: req.body.answerText[i],
                isCorrect: isCorrect[i],
                answerImg: answerImg[i]
            });
        }
    }else{
        for (var i = 0; i < 4; i++) {
            answerOptions.push({
            answerText: req.body.answerText[i],
            isCorrect: isCorrect[i],
        });
    }
    }
    try{
        await Question.findOneAndUpdate({ topic: topic, lesson: lesson, questions: {$elemMatch: {_id: mongoose.Types.ObjectId(id)}} },{
            $set: {
                    'questions.$.questionText': questionText,
                    'questions.$.type': type,
                    'questions.$.answerOptions': answerOptions
            }
        })
        res.send({status: 'success'});
    }catch(err){
        res.send({status: 'error'});
    }
})

router.post("/addQuestion", uploadQuestion, async (req, res)=>{
    const url = req.protocol + '://' + req.get('host');
    const data = req.body
    const topic = data.topic;
    const type = data.type;
    const lesson = data.lesson;
    const questionText = data.questionText;
    const isCorrect = req.body.isCorrect.map(e => JSON.parse(e));
    var answerOptions = [];
    if (type === 'Text + Image'){
        let answerImgBefore = [req.files.answerImg1, req.files.answerImg2, req.files.answerImg3, req.files.answerImg4];
        answerImgBefore.map(item => {
            return item = item.filter(function(a){
                delete a.fieldname;
                delete a.encoding;
                delete a.mimetype;
                delete a.destination;
                delete a.size;
                return true;
            })
        })
        const answerImg = answerImgBefore.map(e => 
                e.map(item => ({...item, urlImage: url + '/public/' + item.filename})));
        for (var i = 0; i < 4; i++) {
            answerOptions.push({
                answerText: req.body.answerText[i],
                isCorrect: isCorrect[i],
                answerImg: answerImg[i]
            });
        }
    }else{
        for (var i = 0; i < 4; i++) {
            answerOptions.push({
            answerText: req.body.answerText[i],
            isCorrect: isCorrect[i],
        });
    }
    }
    try{
        await Question.findOne({
            "topic": topic, "lesson": lesson
        },function(err, item){
            if(item.questions === null || item.questions === undefined){
                Question.findOneAndUpdate({
                    "topic": topic, "lesson": lesson
                },{
                    $set: {
                        questions: 
                            {
                                "_id": new mongoose.Types.ObjectId(),
                                "questionText": questionText,
                                "type": type,
                                "answerOptions": answerOptions
                            },                        
                    }
                }
                ,{
                    new: true
                },function (error){
                    // return result.json({
                    //     "status": "success",
                    //     "message": "LessonId has been inserted",
                    // });
                    res.send({"status": "success"})
                }
                );
        }else if (item.questions.find(e => e.questionText === questionText)){
            // return result.json({
            //     "status": "error",
            //     "message": "Already had this LessonId"
            // });
            res.send({"status": "error"})
        }else{
            Question.findOneAndUpdate({
                "topic": topic, "lesson": lesson
            },{
                $push: {
                    questions: 
                        {
                            "_id": new mongoose.Types.ObjectId(),
                            "questionText": questionText,
                            "type": type,
                            "answerOptions": answerOptions
                        },                        
                }
            }
            ,{
                new: true
            },function (error){
                // return result.json({
                //     "status": "success",
                //     "message": "LessonId has been inserted",
                // });
                res.send({"status": "success"})
            }
            );
        }
        }
        ).clone()
    }catch(err){
        res.send({"status": "error"})
    }

})

//lesson

router.post("/lessonFindbyTopic", async (req, res)=>{
    const {value} = req.body
    const lesson = await Lesson.find({topic: value},{_id: 0, id:1}).sort({id:1});
    res.send(lesson);
});

router.post("/updateLesson", async (req, res) => {
    const { id, content1, content2} =  req.body;
    await Lesson.updateOne({_id: id},{
        $set:{
            content1: content1,
            content2: content2
        }
    })
    res.send({status: 'success'})
})

router.get("/lessonList", async (req, res)=>{
    const lesson = await Lesson.find({},{_id: 1, topic: 1, content1 :1, content2 : 1, id: 1}).sort({topic:1});

    res.send(lesson);
});

router.post("/deleteLesson", async (req, res)=>{
    const {name, id} = req.body;
    await Lesson.deleteOne({topic: name, id: id});
    await Question.deleteMany({topic: name, lesson: id});
    await Lesson.updateMany({topic: name, id: {$gte: id}},{$inc: {id: -1}});
    await Question.updateMany({topic: name, lesson: {$gte: id}},{$inc: {lesson: -1}});
    res.send({status: "success"})
})

router.post("/addLesson", async (req, res)=>{
    const {name, content1, content2} = req.body;
    const topic = await Lesson.find({topic: name},{_id: 0, topic: 1});
    try{
        await Lesson.create({
            topic: name,
            id: topic.length + 1,
            content1: content1,
            content2: content2,
        },function(error){
            if (error) return handleError(error);
            const question = new Question({
                topic: name,
                lesson: topic.length + 1,
                question: []
            });
            question.save(function(error){
                if (error) return handleError(error);
            })
        })
        res.status(200).json({status: "Sucess"});
    }catch(error){
        res.status(500).json({status:'Error'})
    }

}) 
// topic
router.get("/topic", async (req, res)=>{
    const topic = await Topic.find({},{_id: 0, name: 1}).sort({id: 1});
    res.send(topic);
});

router.get("/topicList", async (req, res)=>{
    const topic = await Topic.find({},{"_id": 1,"id":1, "name": 1, "topicImg.urlImage": 1,"topicImg.originalname" : 1, "lessonImg.urlImage": 1,"lessonImg.originalname" : 1, "vocab": 1}).sort({id:1});
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


router.post("/updateImg",uploadMultiple, async (req, res) => {
    const name =  req.body.name;
    const vocab = JSON.parse(req.body.vocab);
    const id = req.body.id;
    const url = req.protocol + '://' + req.get('host');
    //Add to array imgTopic
    let imgTopic = req.files.imgTopic;
    if(imgTopic){
        imgTopic = imgTopic.filter(function(item){
            delete item.fieldname;
            delete item.encoding;
            delete item.mimetype;
            delete item.destination;
            delete item.size;
            return true;
        })
        let fileTopic = imgTopic[0].filename;
        imgTopic.forEach((item) => item.urlImage = url + '/public/' + fileTopic);
    }
    //Add to array imgLesson
    let imgLesson = req.files.imgLesson;
    if(imgLesson){
        imgLesson = imgLesson.filter(function(item){
            delete item.fieldname;
            delete item.encoding;
            delete item.mimetype;
            delete item.destination;
            delete item.size;
            return true;
        })
        let fileLesson = imgLesson[0].filename;
        imgLesson.forEach((item) => item.urlImage = url + '/public/' + fileLesson);
    }
    try{
        if(imgTopic && !imgLesson){
            const pathTopic = await Topic.findOne({_id: id}, {"_id": 0, "topicImg.path": 1 });
            const pathTopicDelete = (pathTopic.topicImg[0]).path;
            await fs.unlinkSync(pathTopicDelete);
            await Topic.updateOne({_id: id},{
                $set:{
                    name: name,
                    topicImg: imgTopic,
                    vocab: vocab,
                }
            })
            res.send({status: 'success'})
        } else if(!imgTopic && imgLesson){
            const pathLesson = await Topic.findOne({_id: id}, {"_id": 0, "lessonImg.path": 1 });
            const pathLessonDelete = (pathLesson.lessonImg[0]).path;
            await fs.unlinkSync(pathLessonDelete);
            await Topic.updateOne({_id: id},{
                $set:{
                    name: name,
                    lessonImg: imgLesson,
                    vocab: vocab,
                }
            })
            res.send({status: 'success'})
        } else if(!imgTopic && !imgLesson){
            await Topic.updateOne({_id: id},{
                $set:{
                    name: name,
                    vocab: vocab,
                }
            })
            res.send({status: 'success'})
        }
        else{
            const pathTopic = await Topic.findOne({_id: id}, {"_id": 0, "topicImg.path": 1 });
            const pathTopicDelete = (pathTopic.topicImg[0]).path;
            await fs.unlinkSync(pathTopicDelete);
        
            const pathLesson = await Topic.findOne({_id: id}, {"_id": 0, "lessonImg.path": 1 });
            const pathLessonDelete = (pathLesson.lessonImg[0]).path;
            await fs.unlinkSync(pathLessonDelete);
            await Topic.updateOne({_id: id},{
                $set:{
                    name: name,
                    topicImg: imgTopic,
                    lessonImg: imgLesson,
                    vocab: vocab,
                }
            })
            res.send({status: 'success'})
        }
    }catch(error){
    res.send({status:"error"});
}
})


router.post("/deleteTopic", async (req, res)=>{
    const {name, id} = req.body;
    const pathTopic = await Topic.findOne({name: name}, {"_id": 0, "topicImg.path": 1 });
    const pathTopicDelete = (pathTopic.topicImg[0]).path;
    await fs.unlinkSync(pathTopicDelete);

    const pathLesson = await Topic.findOne({name: name}, {"_id": 0, "lessonImg.path": 1 });
    const pathLessonDelete = (pathLesson.lessonImg[0]).path;
    await fs.unlinkSync(pathLessonDelete);

    await Topic.deleteOne({name: name});
    await Lesson.deleteMany({topic: name});
    await Question.deleteMany({topic: name});
    await Topic.updateMany({id: {$gte: id}},{$inc: {id: -1}});

    res.send({status: "success"})
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



router.post("/addTopic",uploadMultiple, async (req, res) => {
    const url = req.protocol + '://' + req.get('host');
    const vocab = [];
    const countTopic = await Topic.countDocuments({});
    const id = countTopic + 1;
    const name =  req.body.name;
    //Add to array imgTopic
    let imgTopic = req.files.imgTopic;
    imgTopic = imgTopic.filter(function(item){
        delete item.fieldname;
        delete item.encoding;
        delete item.mimetype;
        delete item.destination;
        delete item.size;
        return true;
    })
    let fileTopic = imgTopic[0].filename;
    imgTopic.forEach((item) => item.urlImage = url + '/public/' + fileTopic);
    //Add to array imgLesson
    let imgLesson = req.files.imgLesson;
    imgLesson = imgLesson.filter(function(item){
        delete item.fieldname;
        delete item.encoding;
        delete item.mimetype;
        delete item.destination;
        delete item.size;
        return true;
    })
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

