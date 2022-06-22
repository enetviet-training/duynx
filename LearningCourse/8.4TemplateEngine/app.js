var express = require("express");
var cookieParser = require("cookie-parser");
var app = express();

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

// ejs

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
    res.render("user", {ID: req.params.id});
})

app.listen(port, function(){
    console.log("Server is listening on PORT:", port);
})
