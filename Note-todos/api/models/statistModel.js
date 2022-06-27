const mongoose = require("mongoose");

const statistSchema = mongoose.Schema({
    created: { type: Number, default: 1 },
    deleted: { type: Number, default: 0 },
    completed: { type: Number, default: 0 }
})

const Statist = mongoose.model("Statist", statistSchema);

module.exports = Statist;