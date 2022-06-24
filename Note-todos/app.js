const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const { MongoClient, ServerApiVersion } = require('mongodb');

const config = require("./config");
const setupController = require("./api/controllers/setupController");
const todoController = require("./api/controllers/todoController");

const app = express();
const port = process.env.PORT || 3000;

app.use("/assets", express.static(__dirname + "public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded(({ extended: true})));

app.use(morgan("dev"));

app.set("view engine", "ejs");

// db info
console.log(config.getDbConnectionString());
mongoose.connect(config.getDbConnectionString(), { seNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 }, (err) => {
    if (err) throw err;
    RunApp();
});

function RunApp () {
    // Connect successful !!
    setupController(app);
    todoController(app);

    app.get("/", function(req,res){
        res.render("index");
    });

    app.listen(port, function(){
        console.log("App listening on port: " + port);
    });
}



