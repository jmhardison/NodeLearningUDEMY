let obj = {
    num: 2
}

let addToThis = function(a,b,c) {
    return this.num + a+b+c;
};

//call binds a function to the firt object passed in.
console.log(addToThis.call(obj,1,2,3));


let person1={
    firstName: 'Jon',
    lastName: 'Hardison'
};

let person2 ={
    firstName: 'Tricia',
    lastName: 'Hardison'
};

function hello(greeting){
    console.log(`${greeting} ${this.firstName} ${this.lastName}`);
};

hello.call(person1, 'What is up');
hello.call(person2, 'Yo');