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
    Statist.find(function(err, statists){
        if (err) throw err;
        console.log(statists[0]);
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
    app.get("/api/statist", function(req,res){
        getStatist(res);
    })

    /**
     * Create a todo
     */

    app.post("/api/todo", function(req, res){

        const todo = {
            text: req.body.text,
            isDone: req.body.isDone
        };

        Todos.create(todo, function(err, todo) {
            if (err) throw err;

            getTodos(res);

            // statist
            Statist.find(function (err, statistResults) {
                if (err) throw err;
                
                // create new document if not exist
                if (statistResults.length === 0) {
                    const newStatist = {
                        created: 1,
                        deleted: 0,
                        completed: req.body.isDone === "true" ? 1 : 0
                    }

                    Statist.create(newStatist, function(err){
                        if (err) throw err;
                        printStatist();
                    })
                }
                else {
                    Statist.findOneAndUpdate(
                        { _id: statistResults[0]._id },
                        { $inc: { created: 1 , completed: req.body.isDone === "true" ? 1 : 0 } },
                        function (err) {
                            if (err) throw err;
                            printStatist();
                        }
                    )
                }    
            })
        });
    });

    /**
     * Update a Todo
     */

    app.put("/api/todo", function(req, res){
        if (!req.body.id){
            return res.status(500).send("Id is required");
        }
        else {

            // Update statist: completed
            let incValue = 0;
            Todos.findById(req.body.id, function(err, foundTodo){
                if (err){
                    return res.status(500).json(err);
                }
                else {
                    console.log(foundTodo.isDone);
                    if( !req.body.isDone || foundTodo.isDone === null)  return;
                    if(req.body.isDone !== foundTodo.isDone.toString())
                    {
                        incValue = (foundTodo.isDone === true ? -1 : 1 )
                    }                   
                }
            })

            Todos.updateMany({
                _id: req.body.id
            }, {
                text: req.body.text,
                isDone: req.body.isDone
            }, function (err){
                if (err){
                    return res.status(500).json(err);
                }
                else {
                    getTodos(res);

                    // statist
                    Statist.find(function (err, statistResults) {
                        if (err) throw err;

                        Statist.findOneAndUpdate(
                            { _id: statistResults[0]._id },
                            { $inc: { completed: incValue } },
                            function (err) {
                                if (err) throw err;
                                printStatist();
                            }
                        )
                    })
                }
                
            })
        }
    });

    /**
     * Delete a todo
     */

    app.delete("/api/todo/:id", function(req, res){
        Todos.deleteMany({
            _id: req.params.id
        }, function(err, todo){
            if(err){
                return res.status(500).json(err);
            }
            else {
                getTodos(res);

                // statist
                Statist.find(function (err, statistResults) {
                    if (err) throw err;

                    Statist.findOneAndUpdate(
                        { _id: statistResults[0]._id },
                        { $inc: { deleted: 1 } },
                        function (err, response) {
                            if (err) throw err;
                            printStatist();
                        }
                    )
                })
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
                Statist.find(function (err, statistResults) {
                    if (err) throw err;

                    Statist.findOneAndUpdate(
                        { _id: statistResults[0]._id },
                        { $inc: { deleted: todo.deletedCount } },
                        function (err, response) {
                            if (err) throw err;
                            printStatist();
                        }
                    )
                })
            }  
        })
    })
}