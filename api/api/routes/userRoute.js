const express = require('express');
const router = express.Router();
const TokenAuth = require('../shared/TokenAuth');
const UserService = require('../services/UserService');

//#region GETS
router.get("/", (request, response) => {
    TokenAuth.RequestWithAuth(request, response, UserService.getAllUsers);
});

router.get("/getUserById", (request, response) => {
    TokenAuth.RequestWithAuth(request, response, UserService.getUserById);
});
//#endregion 
//#region POSTS
router.post("/insertUser", (request, response) => {
    TokenAuth.RequestWithAuth(request, response, UserService.insertNewUser);
});

router.post("/insertUsers", (request, response) => {
    TokenAuth.RequestWithAuth(request, response, UserService.insertManyUsers);
});
//#endregion
//#region DELETES
router.delete("/clear", (request, response) => {
    TokenAuth.RequestWithAuth(request, response, UserService.deleteAllUsers);
});
router.delete("/delete/:userId", (request, response) => {
    TokenAuth.RequestWithAuth(request, response, UserService.deleteUserById);
});
//#endregion
//#region UPDATE
router.put("/update/:userId", (request, response) => {
    TokenAuth.RequestWithAuth(request, response, UserService.updateUser);
});
//#endregion

module.exports = router;