const jwt = require('jsonwebtoken')
const User = require('../models/UserModel');
const config = require('../../tokenConfig.json');

const unauthorizedErrorResponse = { message: "User unauthorized." };

class TokenAuth {
    constructor() { };

    static async RequestWithAuth(request, response, callback) {
        const [token, username] = (request.headers["authorization"]) ? request.headers["authorization"].split("UserName") : null;
        if (!token || !username)
            response.status(403).json(unauthorizedErrorResponse);
        else {
            // Validate the token itself
            jwt.verify(token, config.secret, function (err, decoded) {
                if (err)
                    response.status(403).json(unauthorizedErrorResponse);
                else
                    // Compare to the token in the db
                    User.find({ username, token })
                        .exec()
                        .then((result) => {
                            if (result.length > 0) {
                                if (callback.length > 0)
                                    callback(request, response);
                                else
                                    callback();
                            }
                        });
            });
        }
    }
}

module.exports = TokenAuth;