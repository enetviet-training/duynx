const { json } = require("body-parser");
const Todos = require("../models/todoModel");
const { eventBus, eventsType } = require("../events/eventBus");
const todoType = eventsType.todoEvents;

const getTodos = async (res) => {
    try {
        let todos = await Todos.find();
        res.json(todos);
    } catch (err) {
        res.send(err);
    }
}

exports.getAllTodos = (req, res) => {
    getTodos(res);
}

exports.getOneTodo = async (req, res) => {
    try {
        let todo = await Todos.findById({ _id: req.params.id });
        res.json(todo);
    } catch (err) {
        throw err;
    }
}

exports.createTodo = async (req, res) => {
    let { text, isDone } = req.body;
    let isDoneUpdated = isDone === "true" ? true : false;
    try {
        await Todos.create({ text: text, isDone: isDoneUpdated });
        getTodos(res);

        eventBus.emit(todoType.CREATE, { created: 1, completed: isDoneUpdated ? 1 : 0 });
    } catch (err) {
        throw err;
    }
}

exports.updateTodos = async (req, res) => {
    let { isDone, id, text } = req.body;
    let todo;

    try {
        if (!isDone) {
            todo = await Todos.updateOne({ _id: id }, { text: text });
            getTodos(res);
        }
        else {
            let isDoneUpdated = isDone === "true" ? true : false;
            todo = await Todos.updateOne({
                _id: req.body.id,
                isDone: !isDoneUpdated
            }, {
                text: req.body.text,
                isDone: isDoneUpdated
            });

            if (todo.nModified > 0) {
                getTodos(res);

                eventBus.emit(todoType.UPDATE, { completed: isDoneUpdated ? 1 : -1 });
            }
            else {
                res.status(500).send("Update failed !");
            }
        }
    } catch (err) {
        throw err;
    }
}

exports.deleteTodo = async (req, res) => {
    try {
        let todo = await Todos.deleteOne({ _id: req.params.id })
        if (todo.deletedCount > 0) {
            getTodos(res);

            eventBus.emit(todoType.DELETE, { deleted: todo.deletedCount });
        }
        else {
            res.status(500).send("Not found this todo, cannot delete !");
        }
    } catch (err) {
        throw err;
    }
}

exports.deleteAllTodos = async (req, res) => {
    try {
        let todo = await Todos.deleteMany()
        getTodos(res);

        eventBus.emit(todoType.DELETE, { deleted: todo.deletedCount });
    } catch (err) {
        throw err;
    }
}