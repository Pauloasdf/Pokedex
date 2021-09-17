const express = require('express');
const router = express.Router();
const TokenAuth = require('../shared/TokenAuth');
const PokedexService = require('../services/PokedexService');

//#region GETS
router.get("/", (request, response) => {
    TokenAuth.RequestWithAuth(request, response, PokedexService.getPokedexPages);
});
//#endregion

//#region POSTS
router.post("/insertPage", (request, response) => {
    TokenAuth.RequestWithAuth(request, response, PokedexService.insertPage);
});
//#endregion

module.exports = router;