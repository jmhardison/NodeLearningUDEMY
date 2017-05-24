// let array = [32, 54, 11, 234, 99];

// for (var x=0; x< array.length; x++){
//     console.log(array[x]);
// }

// console.log('FOR EACH=======');

// array.forEach(function(value){
//     console.log(value);
// });

// console.log('FOR EACH ES6 Fat Arrow=======');
// array.forEach((value) => console.log(value));

// console.log('AVERAGE GRADES=======');
 let grades = [98, 87, 82, 74, 89, 87];

// let sum = 0;

// grades.forEach(grade => sum+=grade);

// let average = sum/grades.length;
// console.log(`our average is ${average.toFixed(2)}`);

//map helper
// let array = [1,2,3,4,5];

// let addOne = [];

// let addOneMap = array.map(function(value) {
//     return value+1;
// });

// let addOneMapES = array.map(value => value+1);


// console.log(addOneMap);
// console.log(addOneMapES);

let vehicles = [
    {id: 1, make: 'Ford', model: 'Fiesta', isCar: true},
    {id: 2, make: 'Honda', model: 'Civic', isCar: true},
    {id: 3, make: 'Ford', model: 'F150', isCar: false},
    {id: 4, make: 'Ford', model: 'Mustang', isCar: true}
];


let models = vehicles.map(vehicle => vehicle.model);

console.log(models);
//filter

let filteredVehicles = vehicles.filter(value => value.isCar === true);
console.log(filteredVehicles);

let foundvehicle = vehicles.find(value => value.make === 'Honda');
console.log(foundvehicle);


let driver = {
    vehicleID: 1,
    name: 'Jon'
};

function driverForVehicle(vehicles, driver){
    return vehicles.find(value => value.id === driver.vehicleID);
};

console.log(`driver drives vehicle: ` + driverForVehicle(vehicles, driver));

let total = grades.reduce(function(sum, grade){
    return sum + grade;
}, 0);

console.log(`total = ${total}`);
console.log(`Our average is ${(total / grades.length).toFixed(1)}`);