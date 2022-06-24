const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
    text: String,
    isDone: Boolean
});

const Todos = mongoose.model("Todos", todoSchema);

module.exports = Todos;