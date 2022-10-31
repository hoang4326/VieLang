const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
    topic: String,
    lesson: Number,
    questions: Array,
    // [
    //     {
    //         _id: false,
    //         questionText: {
    //             type: String,
    //         },
    //         answerOptions:[
    //             {
    //                 _id: false,
    //                 answerText: {
    //                     type: String,
    //                 },
    //                 isCorrect: {
    //                     type: Boolean,
    //                 },
    //                 answerImg:{
    //                     type: String,
    //                 }
    //             }
    //         ]
    //     }
    // ],
},{
    collection: "Question",
});

mongoose.model("Question", QuestionSchema);