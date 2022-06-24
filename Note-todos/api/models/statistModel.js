const mongoose = require("mongoose");

const statistSchema = mongoose.Schema ({
    created: Number,
    deleted: Number,
    completed: Number
})

const Statist = mongoose.model("Statist", statistSchema);

module.exports = Statist;