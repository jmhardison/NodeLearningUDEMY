'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _express = require('express');

var _restaurant = require('../models/restaurant.js');

var _restaurant2 = _interopRequireDefault(_restaurant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
    var config = _ref.config,
        db = _ref.db;

    var api = (0, _express.Router)();

    //  for /v1/restaurant/add
    api.post('/add', function (req, res) {
        var newRest = new _restaurant2.default();
        newRest.name = req.body.name;

        newRest.save(function (err) {
            if (err) {
                res.setEncoding(err);
            }
            res.json({ message: 'Restaurant saved successfully.' });
        });
    });

    // for /v1/restaurant/
    api.get('/', function (req, res) {
        _restaurant2.default.find({}, function (err, restaurants) {
            if (err) {
                res.send(err);
            }
            res.json(restaurants);
        });
    });

    // for /v1/restaurant/:ID | get

    api.get('/:id', function (req, res) {
        _restaurant2.default.findById(req.params.id, function (err, restaurant) {
            if (err) {
                res.send(err);
            }
            res.json(restaurant);
        });
    });

    // for /v1/restaurant/:id | update
    api.put('/:id', function (req, res) {
        _restaurant2.default.findById(req.params.id, function (err, restaurant) {
            if (err) {
                res.send(err);
            }
            restaurant.name = req.body.name;
            restaurant.save(function (err) {
                if (err) {
                    res.send(err);
                }
                res.json({ message: req.params.id + ' updated with new name' });
            });
        });
    });

    // for /v1/restaurant/:id | delete
    api.delete('/:id', function (req, res) {
        _restaurant2.default.findByIdAndRemove(req.params.id, function (err) {
            if (err) {
                res.send(err);
            }
            res.json({ message: req.params.id + ' successfully deleted.' });
        });
    });

    return api;
}; //restaurant controller
//# sourceMappingURL=restaurant.js.map