function readDatabase(callback){
    // read Done
    var user = {
        name: "Xuan Duy"
    }

    callback(user);
}

// yeu cau nhan du lieu
readDatabase(function(data){
    console.log("Read done callback");
    console.log("Data: ", data);
});

// noi khac
readDatabase(function (data){
    console.log("Read done callback 2!");
    console.log("User name: ", data.name);
})