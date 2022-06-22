var express = require("express");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var app = express();

var urlencodedParser = bodyParser.urlencoded({ extended: false });

// create application json-parser
var jsonParser = bodyParser.json();

var port = 3000;

app.use("/assets", express.static(__dirname + "/public"));
app.use(cookieParser());
app.set("view engine", "ejs");

// custom middleware
app.use("/", function(req, res, next){
    console.log("Request URL: ", req.url);
    req.requestTime = new Date();
    next();
})

// ...............

app.get("/", function(req, res){
   res.render("index");
})

app.get("/api", function(req, res){
    res.json({
        "firstName" : "Xuan",
        "lastName": "Duy"
    })
})

// /user/id
app.get("/user/:id", function(req, res){
    // req.query.qstr
    res.render("user", {ID: req.params.id, queryString: req.query.qstr });
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

app.listen(port, function(){
    console.log("Server is listening on PORT:", port);
})
