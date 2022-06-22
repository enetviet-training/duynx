var express = require("express");
var cookieParser = require("cookie-parser");
var app = express();

var port = 3000;

app.use("/assets", express.static(__dirname + "/public"));

app.use(cookieParser());

// custom middleware
app.use("/", function(req, res, next){
    console.log("Request URL: ", req.url);
    req.requestTime = new Date();
    next();
})

// other ...

app.get("/", function(req, res){
    console.log("Cookies: ", req.cookies);
    res.send(`
    <link href="/assets/style.css" rel="styleshe et" type="text/css">
    <h1>Hello Express!<h1>
    <p>Request time: ${req.requestTime}</q>
    `);
})

app.get("/api", function(req, res){
    res.json({
        "firstName" : "Xuan",
        "lastName": "Duy"
    })
})

// /user/id
app.get("/user/:id", function(req, res){
    res.cookie("username", req.params.id);
    res.send(`<h1>User: ${req.params.id} <h1>`);
})

app.listen(port, function(){
    console.log("Server is listening on PORT:", port);
})
