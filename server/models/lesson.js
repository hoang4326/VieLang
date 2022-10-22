const mongoose = require('mongoose');

const LessonSchema = new mongoose.Schema({
    topic: String,
    id: Number,
    content1: String,
    content2: String,
    isFinished:Array,


},{
    collection: "Lesson",
});

mongoose.model("Lesson", LessonSchema);