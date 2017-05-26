//foodtruck controller
import mongoose from 'mongoose';
import {Router} from 'express';
import Foodtruck from '../models/foodtruck.js';
import Review from '../models/review.js';

export default({ config, db}) => {
    let api = Router();

    //  for /v1/foodtruck/add
    api.post('/add', (req, res) => {
        let newRest = new Foodtruck();
        newRest.name = req.body.name;
        newRest.foodtype = req.body.foodtype;
        newRest.avgcost = req.body.avgcost;
        newRest.geometry = req.body.geometry;

        newRest.save(err => {
            if(err){
                res.send(err);
            }
            res.json({message: 'Foodtruck saved successfully.'});
        });
    });

    // for /v1/foodtruck/
    api.get('/', (req, res) => {
        Foodtruck.find({}, (err, foodtruck) => {
            if(err){
                res.send(err);
            }
            res.json(foodtruck);
        });
    });

    // for /v1/foodtruck/:ID | get

    api.get('/:id', (req, res) => {
        Foodtruck.findById(req.params.id, (err, foodtruck) => {
            if(err){
                res.send(err);
            }
            res.json(foodtruck);
        });
    });

    // for /v1/foodtruck/:id | update
    api.put('/:id', (req,res) => {
        Foodtruck.findById(req.params.id, (err, foodtruck) => {
            if(err){
                res.send(err);
            }
            foodtruck.name = req.body.name;
            foodtruck.foodtype = req.body.foodtype;
            foodtruck.avgcost = req.body.avgcost;
            foodtruck.geometry = req.body.geometry;
            foodtruck.save(err => {
                if(err)
                {
                    res.send(err);
                }
                res.json({message: `${req.params.id} updated with new name`});
            });
        
            
        });
    });
    
    // for /v1/foodtruck/foodtype/:foodtype to get trucks by type of food
    api.get('/foodtype/:foodtype', (req, res) => {
        Foodtruck.find({foodtype: req.params.foodtype}, (err, foodtruck) =>{
            if(err){
                res.send(err);
            }
            res.json(foodtruck);
        });
    });

    // for /v1/foodtruck/:id | delete
    api.delete('/:id', (req,res) => {
        Foodtruck.findById(req.params.id, (err, foodtruck) => {
            if(err){
                res.send(err);
            }
           foodtruck.reviews.foreach((item) => {
                Review.findByIdAndRemove(item.id, err => {
                    if(err){
                        res.send(err);
                    }

                });
           });            
           foodtruck.delete(err => {
            if(err){
                res.send(err);
            }
           });
            res.json({message: `${req.params.id} successfully deleted.`});
        });
    });

    


    // for review addition
    // /v1/foodtruck/reviews/add/:id
    api.post('/reviews/add/:id', (req, res) => {
        Foodtruck.findById(req.params.id, (err, foodtruck) => {
            if(err){
                res.send(err);
            }
            let newReview = new Review();
            newReview.title = req.body.title;
            newReview.text = req.body.text;
            newReview.foodtruck = foodtruck.id;

            newReview.save((err, review) =>{
                if(err){
                    res.send(err);
                }
                foodtruck.reviews.push(newReview);
                foodtruck.save(err => {
                    if(err){
                        res.send(err);
                    }
                    res.json({message: 'Food truck review saved.'});
                });
            });
            
        });
    });

    // get reviews for a specified food truck
    api.get('/reviews/:id', (req, res) => {
        Review.find({foodtruck: req.params.id}, (err, review) => {
            if(err){
                res.send(err);
            }
            res.json(review);
        })
    })

    return api;

}