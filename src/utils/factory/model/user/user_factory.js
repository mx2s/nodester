const uuidV4 = require('uuid/v4');
let mongoose = require('mongoose');

let jwt = require('../../../../module/auth/jwt');

let User = mongoose.model('User');

module.exports = {
    async createOne() {
        let uuid = uuidV4();

        let newUser = new User({
            uuid: uuid,
            email: Math.random().toString(36).substring(7) + '@test.com',
            password: '1234'
        });

        await newUser.save();

        newUser.api_token = jwt.encrypt(newUser.uuid);

        return newUser;
    }
};