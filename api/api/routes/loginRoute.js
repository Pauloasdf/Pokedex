const express = require('express');
const router = express.Router();
const md5 = require('md5');
const jwt = require('jsonwebtoken')
const config = require('../../tokenConfig.json');
const tokenList = {};
const User = require('../models/user');

router.post("/", (request, response) => {
    User.find({ username: request.body.username, password: md5(request.body.password.toString()) })
        .exec()
        .then((result) => {
            if (result.length > 0) {
                const token = jwt.sign({ username: result[0].username }, config.secret, { expiresIn: config.tokenLife })
                const refreshToken = jwt.sign({ username: result[0].username }, config.refreshTokenSecret, { expiresIn: config.refreshTokenLife })
                const responseJSON = {
                    "approved": true,
                    "status": "Logged in",
                    "token": token,
                    "refreshToken": refreshToken,
                }
                tokenList[refreshToken] = responseJSON

                // Sets user token
                User.update({ _id: result[0]._id }, { $set: { token, ...result } })
                    .exec()
                    .then(() => {
                        res.status(500).json({ message: "Could not update user." });
                    })

                response.status(201).json(responseJSON);
            }
            else
                response.status(500).json("There is no user with theese credentials.");
        })

});

router.post("/validateToken", (request, response) => {
    jwt.verify(request.body.token, config.secret, function (err, decoded) {
        if (err)
            return response.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
        else
            return response.status(201).json({ auth: true, ...decoded });
    });
});

module.exports = router;