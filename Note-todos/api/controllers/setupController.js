const Todos = require("../models/todoModel");
const Statist = require("../models/statistModel");

module.exports = function (app) {

    app.get("/api/setupTodos", function(req, res){
        // setup seed data
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
        ];

        Todos.create(seedTodos, function(err, results){
            if (err) throw err;
            res.send(results);

            // statist
            Statist.find(function(err, statistResults){
                if (err) throw err;
                
                // create or update document
                if (statistResults.length < 1) {
                    Statist.create({
                        created: seedTodos.length,
                        deleted: 0,
                        completed: 0

                    }, function(err){
                        if(err) throw err;
                    })
                }
                else {
                    Statist.findOneAndUpdate(
                        {_id: statistResults[0]._id},
                        {$inc: { created: seedTodos.length}},
                        function(err) {
                            if (err) throw err;

                            // print log
                            Statist.find(function(err, statists){
                                if (err) throw err;
                                console.log(statists[0]);
                            })
                        }
                    )                    
                }
            });
        });
    });
}