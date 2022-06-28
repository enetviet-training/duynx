const { json } = require("body-parser");
const Todos = require("../models/todoModel");
const Statist = require("../models/statistModel");

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

exports.getStatist = async (req, res) => {
    try {
        let statist = await Statist.find();
        res.json(statist);
    } catch (err) {
        res.send(err);
    }
}

const printStatist = async () => {
    try {
        let statist = await Statist.findOne();
        console.log(statist);
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

        await Statist.updateOne(
            {},
            { $inc: { created: 1, completed: isDoneUpdated ? 1 : 0 } },
            { upsert: true });
        printStatist();

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

            // statist
            if (todo.nModified > 0) {
                getTodos(res);
                await Statist.updateOne({ $inc: { completed: isDoneUpdated ? 1 : -1 } });
                printStatist();
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
        todo = await Todos.deleteOne({ _id: req.params.id })
        getTodos(res);

        // statist
        await Statist.updateOne({ $inc: { deleted: todo.deletedCount } });
        printStatist();

    } catch (err) {
        throw err;
    };
}

exports.deleteAllTodos = async (req, res) => {
    try {
        let todo = await Todos.deleteMany()
        getTodos(res);

        // statist
        await Statist.updateOne({ $inc: { deleted: todo.deletedCount } });
        printStatist();

    } catch (err) {
        throw err;
    }
}