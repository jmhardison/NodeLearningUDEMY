'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _middleware = require('../middleware');

var _middleware2 = _interopRequireDefault(_middleware);

var _db = require('../db.js');

var _db2 = _interopRequireDefault(_db);

var _foodtruck = require('../controllers/foodtruck.js');

var _foodtruck2 = _interopRequireDefault(_foodtruck);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express2.default)();

//connect to db
//routes folder index
(0, _db2.default)(function (db) {
    //internal middleware, or not up to you. at this point connected to db.
    router.use((0, _middleware2.default)({ config: _config2.default, db: db }));

    //specify routes
    router.use('/foodtruck', (0, _foodtruck2.default)({ config: _config2.default, db: db }));
});

exports.default = router;
//# sourceMappingURL=index.js.map