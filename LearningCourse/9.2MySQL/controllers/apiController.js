module.exports = function(app){
    app.get("/api/user/:id", function(req, res){
        // get data from database
        var result = {
            "firstName" : "Xuan",
            "lastName": "Duy"
        }
    
        res.json(result);
    })
    
    app.post("/api/user", function(req, res){
        // create new and save to new database
    })
    
    app.put("/api/user", function(req, res){
        // update new and save to new database
    })
    
    app.delete("/api/user/:id", function(req, res){
        // delete user from database
    })
}