const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
    topic: String,
    lesson: String,
    question: String,
    answer: Array,
    answerCorrect: String

},{
    collection: "Question",
});

mongoose.model("Question", QuestionSchema);