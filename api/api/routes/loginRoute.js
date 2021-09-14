const express = require('express');
const router = express.Router();
const md5 = require('md5');
const User = require('../models/user');

router.post("/", (request, response) => {
    User.find({ username: request.body.username, password: md5(request.body.password.toString()) })
        .exec()
        .then((result) => {
            if (result.length > 0)
                response.status(201).json(true);
            else
                response.status(500).json("There is no user with theese credentials.");
        })

});

module.exports = router;