var _ = require("lodash");

var array = [1];
var other = _.concat(array, 2, [3], [[4]]);

console.log(other);
console.log(array);

// collection

var users = [
    {"user" : "Hoa", "age": "30", "active": true},
    {"user" : "Duy", "age": "26", "active": true},
    {"user" : "Lan", "age": "24", "active": false},
];

var user = _.find(users, function(user){
    return user.age < 30;
})

var user2 = _.filter(users, function(user){
    return user.active === true;
})

console.log("Find: ", user);
console.log("Filter: ", user2);

