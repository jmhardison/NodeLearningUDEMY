//required items/////////////////////////
var express = require('express');

var app = express();

var bodyParser = require('body-parser');

var mongoose = require('mongoose');

var uri = "";


var Vehicle = require('./app/models/vehicle.js');
var Dog = require('./app/models/dog.js');
/////////////////////////////////////////


//Configuration
//body parser lets us grab data from the body of a POST

app.use(bodyParser.urlencoded({extended: true}));
//allows us to parse json
app.use(bodyParser.json());

//listen on specific port
var port = process.env.PORT || 3000;

//connect to db
mongoose.connect(uri);


//api routes
var router = express.Router();

// all routes prefixed with api
app.use('/api', router);


//middleware to validate on requests

router.use(function(req, res, next) {
    console.log('Middleware step here');

    next();
});

//middleware



//test route
router.get('/', function(req, res) {
    res.json({message: 'Welcome, Hello World'});
});



//routes for dog
router.route('/dogs')
    .post(function(req,res) {
        var dog = new Dog();
        dog.breed = req.body.breed;
        dog.name = req.body.name;
        dog.age = req.body.age;

        dog.save(function (err) {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'Dog saved.' });
        });

    })

    .get(function(req,res) {
        Dog.find(function(err, dogs) {
            if(err){
                res.send(err);
            }
            res.json(dogs);
        });
    });

//find routes for dog
router.route('/dog/:dog_id')
    .get(function(req,res){
        Dog.findById(req.params.dog_id, function(err, dog) {
            if(err)
            {
                res.send(err);
            }
            res.json(dog);
        })
    })

//routes for vehicle
router.route('/vehicles')
    .post(function(req, res) {
        var vehicle = new Vehicle(); //instantiate new vehicle

        vehicle.make = req.body.make;
        vehicle.model = req.body.model;
        vehicle.color = req.body.color;

        vehicle.save(function(err) {
            if(err) {
                res.send(err);
            }
            res.json({message: 'Vehicle saved.'});
        });
    })

    .get(function(req, res) {
        Vehicle.find(function(err, vehicles){
            if(err) {
                res.send(err);
            }
            res.json(vehicles);

        });
    });





//find by id and color
router.route('/vehicle/:vehicle_id')
    .get(function(req, res) {
        Vehicle.findById(req.params.vehicle_id, function(err, vehicle) {
            if(err) {
                res.send(err);
            }
            res.json(vehicle);
        });
    });

//find by make
router.route('/vehicle/make/:make')
    .get(function(req, res) {
        Vehicle.find({make: req.params.make}, function(err, vehicle) {
            if(err){
                res.send(err);
            }
            res.json(vehicle);
        })
    });


//color
router.route('/vehicle/color/:color')
    .get(function(req,res) {
       Vehicle.find({color: req.params.color}, function(err, vehicle){
           if(err){
               res.send(err);
           }
           res.json(vehicle);
       })
    });


//instantiate server
app.listen(port);
