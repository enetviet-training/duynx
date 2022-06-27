const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
    text: { type: String, default: "" },
    isDone: { type: Boolean, default: false }
});

const Todos = mongoose.model("Todos", todoSchema);

module.exports = Todos;