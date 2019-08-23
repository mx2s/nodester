const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PostModelSchema = new Schema({
    uuid: String,
    title: String,
    content: String
});

let PostModel = mongoose.model('PostModel', PostModelSchema );

PostModelSchema.methods = {
    create(data) {
        let newModel = new PostModel(data);
        newModel.save();
    }
};