const express = require('express');
const router = express.Router();
const PokedexPage = require('../models/pokedexPage');
const mongoose = require('mongoose');

//#region GETS
router.get("/", (request, response) => {
    PokedexPage.find({ active: true }, {})
        .sort({ name: -1 })
        .exec()
        .then((result) => {
            response.status(200).json(result);
        })
});

router.post("/insertPage", (request, response) => {
    const newPage = new PokedexPage({
        _id: new mongoose.Types.ObjectId(),
        name: request.body.name,
        description: request.body.description,
        iconURL: request.body.iconURL,
        active: true
    })
    newPage
        .save()
        .then((result) => response.status(201).json({
            message: "Handling POST requests to /pokedex",
            createdProduct: result
        }))
        .catch(err => {
            console.log(err);
            response.status(500).json({
                error: err
            });
        });
});
module.exports = router;