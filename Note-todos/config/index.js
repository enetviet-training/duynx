var configValues = require("./config");

module.exports = {
    getDbConnectionString: function(){
        return `mongodb+srv://${configValues.username}:${configValues.password}@duytestdb1.jf6onho.mongodb.net/notetodos?retryWrites=true&w=majority`;
    }
}