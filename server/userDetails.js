const mongoose = require('mongoose');

const UserDetailsSchema = new mongoose.Schema({
    name: String,
    email: String,
    username: String,
    password: String,
    cpassword: String,

},{
    collection: "UserInfo",
});

mongoose.model("UserInfo", UserDetailsSchema);