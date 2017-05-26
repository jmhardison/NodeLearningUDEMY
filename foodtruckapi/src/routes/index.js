//routes folder index
import express from 'express';
import config from '../config';
import middleware from '../middleware';
import initializeDB from '../db.js';
import foodtruck from '../controllers/foodtruck.js';
import account from '../controller/account';

let router = express();

//connect to db
initializeDB(db => {
    //internal middleware, or not up to you. at this point connected to db.
    router.use(middleware({config, db}));

    //specify routes
    router.use('/foodtruck', foodtruck({config, db}));
    router.use('/account', account({config, db}));

});

export default router;