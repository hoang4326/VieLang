const mongoose = require('mongoose');

const TopicSchema = new mongoose.Schema({
    name: String,
    url: String,
    id: Number,
    urlLesson: String,
    vocabVie: Array,
    vocabEng: Array,
    vocab: Array
},{
    collection: "Topic",
});

mongoose.model("Topic", TopicSchema);