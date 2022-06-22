var mongoose = require("mongoose");

var todoSchema = mongoose.Schema({
    text: String,
    isDone: Boolean
});

var Todos = mongoose.model("Todos", todoSchema);

module.exports = Todos;