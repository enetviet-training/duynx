const { json } = require("body-parser");
var Todos = require("../models/todoModel");

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

    /**
     * Create a todo
     */

    app.post("/api/todo", function(req, res){

        var todo = {
            text: req.body.text,
            isDone: req.body.isDone
        };

        Todos.create(todo, function(err, todo) {
            if (err) throw err;

            getTodos(res);
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
            Todos.updateMany({
                _id: req.body.id
            }, {
                text: req.body.text,
                isDone: req.body.isDone
            }, function (err, todo){
                if (err){
                    return res.status(500).json(err);
                }
                else {
                    getTodos(res);
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
            }
        })
    })

    /**
     * Delete all Todos
     */

    app.delete("/api/todo/deleteAll", function(req, res){
        Todos.deleteMany( function(err, todo){
            if(err){
                return res.satatus(500).json(err);
            }
            else {
                getTodos(res);
            }
        })
    })
}