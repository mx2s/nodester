const mongoose = require('mongoose');
const customValidations = require('../../utils/validation/custom_validations');

const Schema = mongoose.Schema;

const UserModelSchema = new Schema({
    uuid: { type: String, required: true, unique: true },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: true,
        validate: [customValidations.validateEmail, 'Please fill a valid email address'],
    },
    password: { type: String, required: true, trim: true }
});

UserModelSchema.methods = {
    create(data) {
        let newModel = new User(data);
        newModel.save();
    },
};

UserModelSchema.statics = {
    async count(data = {}) {
        let totalCount = 0;
        await User.countDocuments(data, function (err, c) {
            totalCount = c;
        });
        return totalCount;
    }
};

const User = mongoose.model('User', UserModelSchema);