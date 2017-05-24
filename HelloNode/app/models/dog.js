var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DogSchema = new Schema({

    breed: String,
    name: String,
    age: Number

});

module.exports = mongoose.model('Dog', DogSchema);
