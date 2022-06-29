const Todos = require("../models/todoModel");
const Statist = require("../models/statistModel");

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

const getStatistPromise = () => {
    return new Promise((resolve, reject) => {
        Statist.find(function (err, result) {
            if (err) reject(err);
            else resolve(result);
        })
    })
}

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

const updateStatistPromise = (createdDocuments) => {
    return new Promise((resolve, reject) => {
        Statist.updateOne(
            {},
            { $inc: { created: createdDocuments.length } },
            { upsert: true },
            function (err, result) {
                if (err) reject(err);
                else resolve(result);
            }
        )
    })
}

exports.setupTodos = (req, res) => {
    createTodosPromise(seedTodos, res)
        .then(createdDocuments => updateStatistPromise(createdDocuments))
        .then(getStatistPromise)
        .then(statistResult => {
            console.log(statistResult);
        })
        .catch(err => {
            throw err;
        })
}
