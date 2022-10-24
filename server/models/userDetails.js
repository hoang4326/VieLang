const mongoose = require('mongoose');

const UserDetailsSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    email: {type: String, unique: true},
    username: String,
    password: String,
    role: String,
    lessonDone: Array

},{
    collection: "UserInfo",
});

const AchievementSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "UserInfo"
            },
    totalTime: Number,
    exp: Number,
    level:Number,
    percentLessonDone: Number,
    achievement: Number
},{
    collection: "Achievement",
});

mongoose.model("Achievement", AchievementSchema);
mongoose.model("UserInfo", UserDetailsSchema);