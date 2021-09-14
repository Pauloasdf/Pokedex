const express = require('express');
const router = express.Router();

const md5 = require('md5');
const mongoose = require('mongoose');

const User = require('../models/user');

//#region GETS
router.get("/", (request, response) => {
    User.find({}, { projection: { password: 0 } })
        .exec()
        .then((result) => {
            response.status(200).json(result);
        })
});

router.get("/getUserById", (request, response) => {
    User.find({ active: true, _id: mongoose.ObjectId(request.query.id) }, { projection: { password: 0 } }).toArray((error, result) => {
        if (error) {
            return response.status(500).send(error);
        }
        response.send(result);
    });
});
//#endregion 
//#region POSTS
router.post("/insertUser", (request, response) => {
    const newUser = new User({
        _id: new mongoose.Types.ObjectId(),
        name: request.body.name,
        lastname: request.body.lastname,
        username: request.body.username,
        age: request.body.age,
        password: md5(request.body.password)
    })
    newUser
        .save()
        .then((result) => response.status(201).json({
            message: "Handling POST requests to /users",
            createdProduct: result
        }))
        .catch(err => {
            console.log(err);
            response.status(500).json({
                error: err
            });
        });
});

router.post("/insertUsers", (request, response) => {
    let createdUsers = request.body.map((user) => {
        const newUser = new User({
            _id: new mongoose.Types.ObjectId(),
            name: user.name,
            lastname: user.lastname,
            username: user.username,
            age: user.age,
            password: md5(user.password)
        });
        newUser
            .save()
            .catch(err => {
                return undefined
            });
        return newUser;
    })
    if (createdUsers.filter((x) => x !== undefined).length === 0)
        response.status(500).json({
            message: "Failed to add users."
        })
    else
        response.status(201).json({
            message: "Users added successfully.",
            createdProduct: createdUsers
        })
});
//#endregion
//#region DELETES
router.delete("/clear", (req, res, next) => {
    User.remove({})
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Users deleted successfully',
                result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});
router.delete("/delete/:userId", (req, res, next) => {
    const id = req.params.userId;
    User.remove({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json({ message: "User removed successfully!", result });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});
//#endregion
//#region UPDATE
router.put("/update/:userId", (req, res, next) => {
    const id = req.params.userId;
    const updatedUser = {};
    for (const ops of Object.entries(req.body)) {
        updatedUser[ops[0]] = (ops[0] !== "password") ? ops[1] : md5(ops[1]);
    }
    User.update({ _id: id }, { $set: updatedUser })
        .exec()
        .then(result => {
            console.log(result);
            if (result.nModified > 0)
                res.status(200).json({ message: "User updated successfully!", result });
            else
                res.status(500).json({ message: "No user was modified." });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});
//#endregion

module.exports = router;