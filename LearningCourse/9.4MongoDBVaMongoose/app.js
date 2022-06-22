var express = require("express");
var cookieParser = require("cookie-parser");
var mongoose = require("mongoose");
const { MongoClient, ServerApiVersion } = require('mongodb');

var app = express();

var apiController = require("./controllers/apiController");
var homeController = require("./controllers/homeController");

var port = 3000;

//mongoose.connect("mongodb+srv://duynguyenxuan:duy123456@duytestdb1.jf6onho.mongodb.net/?retryWrites=true&w=majority");

const uri = "mongodb+srv://duynguyenxuan:duy123456@duytestdb1.jf6onho.mongodb.net/test?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });



var personSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    address: String
})

var Person = mongoose.model("Person", personSchema);

app.use("/assets", express.static(__dirname + "/public"));
app.use(cookieParser());
app.set("view engine", "ejs");


mongoose.connect(uri, { seNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 }, (err) => {
    if (err) {
        console.log(err);
        return;
    }

    console.log("Connect successfully !");

    // custom middleware
    app.use("/", function (req, res, next) {
        console.log("Request URL: ", req.url);
        req.requestTime = new Date();

        // Create objects
        var Duy = Person({
            firstName: "Duy",
            lastName: "Xuan",
            address: "Hai Duong"
        });
        console.log(Duy);
        Duy.save(function (err) {
            if (err) throw err;

            console.log("Duy is created");
        })

        var Lan = Person({
            firstName: "Lan",
            lastName: "Thuy",
            address: "Gia Loc"
        });
        
        Lan.save(function (err) {
            if (err) throw err;

            console.log("Lan is created");
        })

        next();
    })

    // ...............
    apiController(app);
    homeController(app);

    app.listen(port, function () {
        console.log("Server is listening on PORT:", port);
    })

});

