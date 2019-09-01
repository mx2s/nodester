const uuidV4 = require('uuid/v4');
let mongoose = require('mongoose');

let Post = mongoose.model('Post');

module.exports = {
    async createOne() {
        let uuid = uuidV4();

        let newPost = new Post({
            uuid: uuid,
            title: "factory generated post title",
            content: "factory generated post content"
        });

        await newPost.save();

        return newPost;
    }
};