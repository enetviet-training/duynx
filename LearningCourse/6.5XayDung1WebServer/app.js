var http = require("http");

http.createServer(function (req, res){

    res.writeHead(200, {'Context-Type': 'text/plain'});
    res.end("Hello Web from Node.js!");

}).listen(1335, "127.0.0.1")