const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PostModelSchema = new Schema({
    uuid:       { type: String, required: true, unique: true },
    title:      { type: String, required: true, trim: true, minlength: 2 },
    content:    { type: String, required: true, trim: true, minlength: 10 }
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
