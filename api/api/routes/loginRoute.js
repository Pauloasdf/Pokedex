const express = require('express');
const router = express.Router();
const LoginService = require('../services/LoginService');

router.post("/", (request, response) => {
    LoginService.Login(request, response);
});

module.exports = router;