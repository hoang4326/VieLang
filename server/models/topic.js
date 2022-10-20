const mongoose = require('mongoose');

const TopicSchema = new mongoose.Schema({
    name: String,
    url: { data: Buffer, contentType: String },
    id: Number,
    urlLesson: { data: Buffer, contentType: String },
    vocab: Array
},{
    collection: "Topic",
});

mongoose.model("Topic", TopicSchema);