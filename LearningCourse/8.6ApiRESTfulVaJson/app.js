var express = require("express");
var cookieParser = require("cookie-parser");
var app = express();

var apiController = require("./controllers/apiController");
var homeController = require("./controllers/homeController");

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
apiController(app);
homeController(app);

app.listen(port, function(){
    console.log("Server is listening on PORT:", port);
})
