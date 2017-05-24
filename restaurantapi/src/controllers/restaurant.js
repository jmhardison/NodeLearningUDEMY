//restaurant controller
import mongoose from 'mongoose';
import {Router} from 'express';
import Restaurant from '../models/restaurant.js';

export default({ config, db}) => {
    let api = Router();

    //  for /v1/restaurant/add
    api.post('/add', (req, res) => {
        let newRest = new Restaurant();
        newRest.name = req.body.name;

        newRest.save(err => {
            if(err){
                res.setEncoding(err);
            }
            res.json({message: 'Restaurant saved successfully.'});
        });
    });

    // for /v1/restaurant/
    api.get('/', (req, res) => {
        Restaurant.find({}, (err, restaurants) => {
            if(err){
                res.send(err);
            }
            res.json(restaurants);
        });
    });

    // for /v1/restaurant/:ID | get

    api.get('/:id', (req, res) => {
        Restaurant.findById(req.params.id, (err, restaurant) => {
            if(err){
                res.send(err);
            }
            res.json(restaurant);
        });
    });

    // for /v1/restaurant/:id | update
    api.put('/:id', (req,res) => {
        Restaurant.findById(req.params.id, (err, restaurant) => {
            if(err){
                res.send(err);
            }
            restaurant.name = req.body.name;
            restaurant.save(err => {
                if(err)
                {
                    res.send(err);
                }
                res.json({message: `${req.params.id} updated with new name`});
            });
        
            
        });
    });
    
    // for /v1/restaurant/:id | delete
    api.delete('/:id', (req,res) => {
        Restaurant.findByIdAndRemove(req.params.id, err => {
            if(err){
                res.send(err);
            }
            res.json({message: `${req.params.id} successfully deleted.`});
        });
    });




    return api;

}