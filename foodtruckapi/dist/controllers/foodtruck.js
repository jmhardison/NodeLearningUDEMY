'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _express = require('express');

var _foodtruck = require('../models/foodtruck.js');

var _foodtruck2 = _interopRequireDefault(_foodtruck);

var _review = require('../models/review.js');

var _review2 = _interopRequireDefault(_review);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//foodtruck controller
exports.default = function (_ref) {
    var config = _ref.config,
        db = _ref.db;

    var api = (0, _express.Router)();

    //  for /v1/foodtruck/add
    api.post('/add', function (req, res) {
        var newRest = new _foodtruck2.default();
        newRest.name = req.body.name;
        newRest.foodtype = req.body.foodtype;
        newRest.avgcost = req.body.avgcost;
        newRest.geometry = req.body.geometry;

        newRest.save(function (err) {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'Foodtruck saved successfully.' });
        });
    });

    // for /v1/foodtruck/
    api.get('/', function (req, res) {
        _foodtruck2.default.find({}, function (err, foodtruck) {
            if (err) {
                res.send(err);
            }
            res.json(foodtruck);
        });
    });

    // for /v1/foodtruck/:ID | get

    api.get('/:id', function (req, res) {
        _foodtruck2.default.findById(req.params.id, function (err, foodtruck) {
            if (err) {
                res.send(err);
            }
            res.json(foodtruck);
        });
    });

    // for /v1/foodtruck/:id | update
    api.put('/:id', function (req, res) {
        _foodtruck2.default.findById(req.params.id, function (err, foodtruck) {
            if (err) {
                res.send(err);
            }
            foodtruck.name = req.body.name;
            foodtruck.foodtype = req.body.foodtype;
            foodtruck.avgcost = req.body.avgcost;
            foodtruck.geometry = req.body.geometry;
            foodtruck.save(function (err) {
                if (err) {
                    res.send(err);
                }
                res.json({ message: req.params.id + ' updated with new name' });
            });
        });
    });

    // for /v1/foodtruck/:id | delete
    api.delete('/:id', function (req, res) {
        _foodtruck2.default.findById(req.params.id, function (err, foodtruck) {
            if (err) {
                res.send(err);
            }
            foodtruck.reviews.foreach(function (item) {
                _review2.default.findByIdAndRemove(item.id, function (err) {
                    if (err) {
                        res.send(err);
                    }
                });
            });
            foodtruck.delete(function (err) {
                if (err) {
                    res.send(err);
                }
            });
            res.json({ message: req.params.id + ' successfully deleted.' });
        });
    });

    // for review addition
    // /v1/foodtruck/reviews/add/:id
    api.post('/reviews/add/:id', function (req, res) {
        _foodtruck2.default.findById(req.params.id, function (err, foodtruck) {
            if (err) {
                res.send(err);
            }
            var newReview = new _review2.default();
            newReview.title = req.body.title;
            newReview.text = req.body.text;
            newReview.foodtruck = foodtruck.id;

            newReview.save(function (err, review) {
                if (err) {
                    res.send(err);
                }
                foodtruck.reviews.push(newReview);
                foodtruck.save(function (err) {
                    if (err) {
                        res.send(err);
                    }
                    res.json({ message: 'Food truck review saved.' });
                });
            });
        });
    });

    // get reviews for a specified food truck
    api.get('/reviews/:id', function (req, res) {
        _review2.default.find({ foodtruck: req.params.id }, function (err, review) {
            if (err) {
                res.send(err);
            }
            res.json(review);
        });
    });

    return api;
};
//# sourceMappingURL=foodtruck.js.map