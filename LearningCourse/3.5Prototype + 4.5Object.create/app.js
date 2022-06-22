function Person(name, password){
    this.name = name;
    this.password = password;
}

Person.prototype.getName = function(){
    return this.name;
}

Person.prototype.getPassword = function(){
    return this.password;
}

Person.prototype.getLevel = function(){
    return this.level;
}

Person.prototype.level = "admin";

function User(name){
    this.name = name;
}

User.prototype = new Person();

var person = new Person("Ti", "Password1234");
var user = new User("Teo", "Password5678");

console.log(user.getName());
console.log(user.getLevel());
console.log(user.getPassword());
console.log(person.getName());

//
Date.prototype.vnFormat = function () {
    var yyyy = this.getFullYear();
    var mm = this.getMonth() + 1;
    var dd = this.getDate();
    return dd + "/" + mm + "/" + yyyy;
}

var now = new Date();
var bthday = new Date(1996, 03, 10);

console.log(now.vnFormat());
console.log(bthday.vnFormat());

// 4.5
var Player = {
    name: "",
    password: "",
    getInfo: function(){
        return this.name + " " + this.password;
    }
}

var Duy = Object.create(Player);
Duy.name = "Xuân Duy";
Duy.password = "Duy1234";

var Ronaldo = Object.create(Player);
Ronaldo.name = "MESSI";
Ronaldo.password = "Real United";

// Player.prototype.level = "ST";
// Player.prototype.getPosition = function(){
//     return this.level;
// } not work

///////////
console.log("/////////////////////");
console.log(Duy.getInfo());
//console.log(Duy.getPosition()); not work