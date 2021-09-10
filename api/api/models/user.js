const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    lastname: String,
    username: String,
    password: String,
    age: Number,
    active: Boolean
})

module.exports = mongoose.model("User", userSchema);