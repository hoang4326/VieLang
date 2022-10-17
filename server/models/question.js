const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
    name: String,
    url: String,
    id: Number,
    urlLesson: String,
},{
    collection: "Question",
});

mongoose.model("Question", QuestionSchema);