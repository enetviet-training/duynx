var http = require("http");
var fs = require("fs");

http.createServer(function(req, res){
    res.writeHead(200,{'Content-Type': 'text/html'});
    
    // 6.6
    // fs.readFile(__dirname + "/index.html", "utf8", function(err, data){
    //     if(err) throw err;
    //     var html = data;
    //     var user = "Xuan Duy Nguyen";
    //     html = html.replace("{user}", user);
    //     res.end(html);
    // });

    // 6.7
    fs.createReadStream(__dirname + "/index.html").pipe(res);
    
}).listen(1337, "127.0.0.1")