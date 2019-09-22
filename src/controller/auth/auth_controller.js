let mongoose = require('mongoose');
let jwt = require('../../module/auth/jwt');

const SimpleResponses = require('../../utils/response/simple_responses');

const User = mongoose.model('User');

module.exports = {
    login: async (req, res) => {
        let user = null;
        await User.findOne({ email: req.query.email }, function (err, item) {
            user = item;
        });
        if (!user) {
            await SimpleResponses.error(res, "User not exist", 404);
            return;
        }
        if (user.password !== req.query.password) {
            await SimpleResponses.error(res, "Invalid email or password", 401);
            return;
        }
        await res.json({
            "data": {
                "token": jwt.encrypt(user.uuid)
            },
        });
    }
};
