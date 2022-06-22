var Emitter = require("./emitter");
var eventConfig = require("./config").events;

var emitter = new Emitter();

// bad
emitter.on("bad", function(){
    console.log("Một môn nào đó bị điểm kém !")
});

emitter.on("bad", function(){
    console.log("Có môn điểm kém, cần báo phụ huynh SOS SOS !!!\n")
});

// good
emitter.on("good", function(){
    console.log("Một môn nào đó được điểm cao !")
});

emitter.on("good", function(){
    console.log("Có môn điểm cao, cần tuyên dương !!!\n")
});


var scores = [10, 6, 4, 8, 9, 0];

// for (var s of scores){
//     if(s < 5){
//         console.log("Điểm kém quá: ", s);
//         emitter.emit("bad");
//     }
//     if(s > 8){
//         console.log("Điểm cao thế: ", s);
//         emitter.emit("good");
//     }

//     // insert db.

// }

for (var s of scores){
    if(s < 5){
        console.log(`Điểm kém quá: ${s}`);
        emitter.emit(eventConfig.BAD_SCORE);
    }
    if(s > 8){
        console.log(`Điểm cao thế: ${s}`); 
        emitter.emit(eventConfig.GOOD_SCORE);
    }

    // insert db.

}