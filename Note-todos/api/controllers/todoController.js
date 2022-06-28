const { json } = require("body-parser");
const Todos = require("../models/todoModel");
const Statist = require("../models/statistModel");

const getTodos = (res) => {
    Todos.find((err, todos) => {
        if (err) {
            res.send(err);
        }
        else {
            res.json(todos);
        }
    });
}

exports.getAllTodos = (req, res) => {
    getTodos(res);
}

exports.getOneTodo = (req, res) => {
    Todos.findById({ _id: req.params.id }, function (err, todo) {
        if (err) throw err;
        res.json(todo);
    });
}

exports.getStatist = (req, res) => {
    Statist.find((err, statist) => {
        if (err) {
            res.send(err);
        }
        else {
            res.json(statist);
        }
    });
}

const printStatist = () => {
    Statist.findOne((err, statist) => {
        if (err) throw err;
        console.log(statist);
    })
}

exports.createTodo = async (req, res) => {
    let { text, isDone } = req.body;
    let isDoneUpdated = isDone === "true" ? true : false;

    try {
        let todo = await Todos.create({ text: text, isDone: isDoneUpdated })
        getTodos(res);

        await Statist.updateOne(
            {},
            { $inc: { created: 1, completed: isDoneUpdated ? 1 : 0 } },
            { upsert: true })
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
            todo = await Todos.updateOne({ _id: id }, { text: text })
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
            })

            // statist
            if (todo.nModified > 0) {
                getTodos(res);
                await Statist.updateOne({ $inc: { completed: isDoneUpdated ? 1 : -1 } })
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
        await Statist.updateOne({ $inc: { deleted: todo.deletedCount } })
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
        await Statist.updateOne({ $inc: { deleted: todo.deletedCount } })
        printStatist();

    } catch (err) {
        throw err;
    }
}