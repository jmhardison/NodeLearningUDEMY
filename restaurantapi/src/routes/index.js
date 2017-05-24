//routes folder index
import express from 'express';
import config from '../config';
import middleware from '../middleware';
import initializeDB from '../db.js';
import restaurant from '../controllers/restaurant.js';

let router = express();

//connect to db
initializeDB(db => {
    //internal middleware, or not up to you. at this point connected to db.
    router.use(middleware({config, db}));

    //specify routes
    router.use('/restaurant', restaurant({config, db}));

});

export default router;