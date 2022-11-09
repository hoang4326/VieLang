const mongoose = require('mongoose');

const TopicSchema = new mongoose.Schema({
    name: String,
    id: Number,
    totalLesson: Number,
    lessonDone: Array,
    topicImg: Array,
    lessonImg: Array,
    vocab: Array
},{
    collection: "Topic",
});

mongoose.model("Topic", TopicSchema);