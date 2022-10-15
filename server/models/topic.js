const mongoose = require('mongoose');

const TopicSchema = new mongoose.Schema({
    name: String,
    url: String,
    id: Number,

},{
    collection: "Topic",
});

mongoose.model("Topic", TopicSchema);