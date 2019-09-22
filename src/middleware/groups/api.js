let SimpleResponses = require('../../utils/response/simple_responses');
let jwt = require('../../module/auth/jwt');

module.exports.get = function (req, res, next) {
    jwt.isUserLoggedIn(req).then((authorized) => {
        if (authorized) {
            next();
        } else {
            SimpleResponses.error(res, "Not authorized", 401).then();
        }
    });
};