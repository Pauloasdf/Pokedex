const md5 = require('md5');
const jwt = require('jsonwebtoken')
const config = require('../../tokenConfig.json');
const tokenList = {};
const User = require('../models/UserModel');

class LoginService {
    static Login(request, response) {
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
                        .catch(() => {
                            response.status(500).json({ message: "Could not update user token." });
                        })

                    response.status(201).json(responseJSON);
                }
                else
                    response.status(401).json("User unauthorized.");
            })
    }
}
module.exports = LoginService;