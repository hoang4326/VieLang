const mongoose = require('mongoose');

const LessonSchema = new mongoose.Schema({
    topicId: mongoose.Schema.Types.ObjectId,
    topic: String,
    id: Number,
    content1: String,
    content2: String,
    isFinished:Array,
    vocabVie: Array,
    vocabEng: Array,

},{
    collection: "Lesson",
});

mongoose.model("Lesson", LessonSchema);