var bodyParser = require("body-parser");

var urlencodedParser = bodyParser.urlencoded({ extended: false });

// create application json-parser
var jsonParser = bodyParser.json();

module.exports = function(app){
    app.get("/", function(req, res){
        res.render("index");
     })
     
     app.post("/login", urlencodedParser, function(req, res){
         res.send("Welcome, " + req.body.username);
         console.log(req.body.username);
         console.log(req.body.password);
     })
     
     app.post("/loginjson", jsonParser, function(req, res){
         res.send("OK");
         console.log(req.body.firstName);
         console.log(req.body.lastName);
     })
}