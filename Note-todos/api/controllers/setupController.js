const Todos = require("../models/todoModel");
const Statist = require("../models/statistModel");
const { eventBus, eventsType } = require("../events/eventBus");
const todoType = eventsType.todoEvents;

const seedTodos = [
    {
        text: "Học Node.js",
        isDone: false
    },
    {
        text: "Học Angular.js",
        isDone: false
    },
    {
        text: "Viết ứng dụng hoàn chỉnh",
        isDone: false
    }
]

const createTodosPromise = (content, res) => {
    return new Promise((resolve, reject) => {
        Todos.create(content, (err, result) => {
            if (err) reject(err);
            else {
                res.send(result);
                resolve(result);
            }
        })
    })
}

const updateStatist = (createdDocuments) => {
    let completedCount = 0;
    createdDocuments.forEach(element => {
        completedCount += element.isDone ? 1 : 0;
    });

    eventBus.emit(todoType.CREATE, { created: createdDocuments.length, completed: completedCount });
}

exports.setupTodos = (req, res) => {
    createTodosPromise(seedTodos, res)
        .then(createdDocuments => updateStatist(createdDocuments))
        .catch(err => {
            throw err;
        })
}
