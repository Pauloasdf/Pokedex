const User = require('../models/UserModel');
const mongoose = require('mongoose');
const md5 = require('md5');

class UserService {
    static getAllUsers(request, response) {
        User.find({}, { projection: { password: 0 } })
            .exec()
            .then((result) => {
                response.status(200).json(result);
            })
    };
    static getUserById(request, response) {
        User.find({ active: true, _id: mongoose.ObjectId(request.query.id) }, { projection: { password: 0 } }).toArray((error, result) => {
            if (error) {
                return response.status(500).send(error);
            }
            response.send(result);
        });
    };
    static insertNewUser(request, response) {
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
                response.status(500).json({
                    error: err
                });
            });
    };
    static insertManyUsers(request, response) {
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
    };
    static deleteAllUsers(request, response) {
        User.remove({})
            .exec()
            .then(result => {
                response.status(200).json({
                    message: 'Users deleted successfully',
                    result
                });
            })
            .catch(err => {
                response.status(500).json({
                    error: err
                });
            });
    };
    static deleteUserById(request, response) {
        const id = request.params.userId;
        User.remove({ _id: id })
            .exec()
            .then(result => {
                response.status(200).json({ message: "User removed successfully!", result });
            })
            .catch(err => {
                response.status(500).json({
                    error: err
                });
            });
    };
    static updateUser(request, response) {
        const id = request.params.userId;
        const updatedUser = {};
        for (const ops of Object.entries(request.body)) {
            updatedUser[ops[0]] = (ops[0] !== "password") ? ops[1] : md5(ops[1]);
        }
        User.update({ _id: id }, { $set: updatedUser })
            .exec()
            .then(result => {
                if (result.nModified > 0)
                    response.status(200).json({ message: "User updated successfully!", result });
                else
                    response.status(500).json({ message: "No user was modified." });
            })
            .catch(err => {
                response.status(500).json({
                    error: err
                });
            });
    };
}

module.exports = UserService;