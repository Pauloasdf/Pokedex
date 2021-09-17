const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    description: String,
    iconURL: String,
    active: Boolean,
    height: Number,
    width: Number
})

module.exports = mongoose.model("PokedexPage", userSchema);