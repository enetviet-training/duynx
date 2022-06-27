const { json } = require("body-parser");
const Todos = require("../models/todoModel");
const Statist = require("../models/statistModel")

function getTodos(res){
    Todos.find(function (err, todos){
        if (err){
            res.send(err);
        }
        else {
            res.json(todos);
        }
    });
}

function getStatist(res){
    Statist.find(function (err, statist){
        if (err){
            res.send(err);
        }
        else {
            res.json(statist);
        }
    });
}

function printStatist(){
    Statist.findOne(function(err, statist){
        if (err) throw err;
        console.log(statist);
    })
}

module.exports = function(app){

    // get all todos
    app.get("/api/todos", function(req,res){
        getTodos(res);
    })

    // /api/todo/123456
    app.get("/api/todo/:id", function(req, res){

        Todos.findById({_id: req.params.id}, function (err, todo){
            if (err) throw err;

            res.json(todo);
        });
    });

    // get statist
    app.get("/api/todos/statist", function(req,res){
        getStatist(res);
    })

    /**
     * Create a todo
     */

    app.post("/api/todo", function(req, res){

        Todos.create({text: req.body.text, isDone: req.body.isDone === "true" ? true : false}, function(err) {
            if (err) throw err;

            getTodos(res);

            // statist
            Statist.updateOne(
                { },
                { $inc: { created: 1 , completed: req.body.isDone === "true" ? 1 : 0 } }, 
                { upsert: true},
                 function (err) {
                    if (err) throw err;
                    printStatist();
                }
            )
        });
    });

    /**
     * Update a Todo
     */
    app.put("/api/todo", function (req, res) {
        if (!req.body.id) {
            return res.status(500).send("Id is required");
        }
        else {
            let { isDone: isDoneReq } = req.body;
            if (!isDoneReq) {
                Todos.updateOne({
                    _id: req.body.id
                }, {
                    text: req.body.text
                }, function (err) {
                    if (err) throw err;
                })
            }
            else {
                Todos.updateOne({
                    _id: req.body.id,
                }, {
                    text: req.body.text,
                    isDone: isDoneReq === "true" ? true : false,
                },
                    function (err, todo) {
                        if (err) throw err;
                        console.log(todo);

                        // statist
                        Statist.updateOne(
                            { $inc: { completed: isDoneReq === "true" ? 1 : -1 } },
                            function (err) {
                                if (err) throw err;
                                printStatist();
                            }
                        )
                    })

            }

            getTodos(res);
        }
    });

    /**
     * Delete a todo
     */

    app.delete("/api/todo/:id", function(req, res){
        Todos.deleteOne({
            _id: req.params.id
        }, function(err){
            if(err){
                return res.status(500).json(err);
            }
            else {
                getTodos(res);

                // statist
                Statist.updateOne(
                    { $inc: { deleted: 1 } },
                    function (err) {
                        if (err) throw err;
                        printStatist();
                    }
                )
            }
        })
    })

    /**
     * Delete all Todos
     */

    app.delete("/api/todos/deleteAll", function(req, res){
        Todos.deleteMany( function(err, todo){
            if(err){
                return res.status(500).json(err);
            }
            else {
                getTodos(res);

                // statist
                Statist.updateOne(
                    { $inc: { deleted: todo.deletedCount } },
                    function (err) {
                        if (err) throw err;
                        printStatist();
                    }
                )
            }  
        })
    })
}