const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PostModelSchema = new Schema({
    uuid: String,
    title: String,
    content: String
});

PostModelSchema.methods = {
    create(data) {
        let newModel = new Post(data);
        newModel.save();
    },
};

PostModelSchema.statics = {
    async count(data = {}) {
        let totalCount = 0;
        await Post.countDocuments(data, function (err, c) {
            totalCount = c;
        });
        return totalCount;
    }
};

const Post = mongoose.model('Post', PostModelSchema);
