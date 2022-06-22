var fs = require("fs");
var zlib = require("zlib");

var readable = fs.createReadStream(__dirname + "/readme.txt", {
    endcoding: "utf8",
    highWaterMark: 2 * 1024// 1 KB
});

var writable = fs.createWriteStream(__dirname + "/read2copy.txt");
var compressed = fs.createWriteStream(__dirname + "/readme.txt.gz");

var gzip = zlib.createGzip();

// copy
readable.pipe(writable);

//compress
readable.pipe(gzip).pipe(compressed);