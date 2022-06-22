var fs = require("fs");
const { Writable } = require("stream");

// var readable1 = fs.createReadStream(__dirname + "/readme.txt");

// readable.on("data", function(chunk){
//     console.log(chunk);
//});
var readable = fs.createReadStream(__dirname + "/readme.txt", {
    endcoding: "utf8",
    highWaterMark: 1 * 1024// 1 KB
});

var writable = fs.createWriteStream(__dirname + "/read2copy.txt");

readable.on("data", function(chunk){
    console.log(chunk.length);
    writable.write(chunk);
});
