let jwt = require('jsonwebtoken');
let mongoose = require('mongoose');

const config = require("../../../config.json");

const appConfig = config[process.env.NODE_ENV];

let User = mongoose.model('User');

/**
 * @param {string} userUuid
 */
module.exports.encrypt = function (userUuid) {
    return jwt.sign({ userUuid: userUuid }, appConfig.auth.secret_key, {
        expiresIn: "14 days"
    });
};

/**
 * @param {string} token
 */
module.exports.getUserUuid = function (token) {
    let decoded = null;
    try {
        decoded = jwt.verify(token, appConfig.auth.secret_key);
    } catch(err) {
        return null;
    }
    return decoded.userUuid;
};

module.exports.isUserLoggedIn = async function (req) {
    return await module.exports.getRequestUser(req) !== null;
};

module.exports.getRequestUser = async function (req) {
    let uuid = module.exports.getUserUuid(req.query.api_token);
    if (uuid === null) {
        return null;
    }

    let loggedInUser = null;

    await User.findOne({uuid: uuid}, function (err, item) {
        loggedInUser = item;
    });

    return loggedInUser;
};
