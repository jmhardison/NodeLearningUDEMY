//object literal
var truck = {
    make: 'Dodge',
    wheels: 4
}

console.log(`I have a ${truck['make']} that has ${truck['wheels']} wheels.`);

console.log(`I have a ${truck.make} that has ${truck.wheels} wheels.`);

var employee = {
    //properties
    firstName: 'Jon',
    lastName: 'Hardison',
    //method
    fullName: function(){
        return `${this.firstName} ${this.lastName}`;
    }
};

console.log(employee.fullName());


function Vehicle(make, model, year) {
    this.make = make;
    this.model = model;
    this.year = year;
    this.getFullDescription = function() {
        return `${this.year} ${this.make} ${this.model}`;
    };
}

let myCar = new Vehicle('Ford', 'Fiesta', '2012');
let myWifesCar = new Vehicle('Honda', 'Civic HB', '2017');

console.log(myCar.make, myCar.model, myCar.year);
console.log(myWifesCar.getFullDescription());

// function createVehicle(make, model, year) {
//     return {
//         make: make,
//         model: model,
//         year: year,

//         getFullDescription: function(){
//             return `${this.make} ${this.model} ${this.year}`;
//         }
//     };
// }

//es6

function createVehicle(make, model, year) {
    return {
        make,
        model,
        year,

        getFullDescription() {
            return `${this.make} ${this.model} ${this.year}`;
        }
    };
}

let myCar2 = createVehicle('Ford','Mustang', '1980');
console.log(myCar2.getFullDescription());