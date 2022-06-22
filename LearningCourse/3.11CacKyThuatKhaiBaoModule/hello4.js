function Person(){
    this.message = "Hello 4";
    this.sayHello = function(){
        console.log(this.message);
    }
}

module.exports = Person;