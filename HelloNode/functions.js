function sayHi() {
    console.log('hi there.');
}

function sayHiWithParameter(name) {
    console.log(`hi there ${name}`);
}

function addThreeNumbers(a, b, c) {
    return a + b + c;
}

function sayHello(firstName, lastName){
    return (`Well hello, ${firstName} ${lastName}`);
}




sayHi();
sayHiWithParameter('Jon');
console.log(addThreeNumbers(10,20,30));

console.log(sayHello('Jonathan', 'Hardison'));


let sayGreeting = function(){
    return 'Well, hello there';
}

console.log(sayGreeting());


//IIFE - Immediately Invoked Function Expression
let sayGreeting2 = (function() {
    return 'hello how are you';
}());

console.log(sayGreeting2);

let sayGreeting3 = (function(firstName, lastName) {
    return `well hello there 3 - ${firstName} ${lastName}`;
}('jon', 'hardison'));

console.log(sayGreeting3);



let speakNames = function(firstName, lastName) {
    return `The names are ${firstName} and ${lastName}`;
}

let speakNamesES6 = (firstName, lastName) => `The names are ${firstName} and ${lastName} for es6`;

console.log(speakNames('Jack','Horner'));
console.log(speakNamesES6('Jack','Horner'));