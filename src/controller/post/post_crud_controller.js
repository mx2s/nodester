const uuidV4 = require('uuid/v4');
let mongoose = require('mongoose');

const PostTransformer = require("../../transformer/post/post_transformer");

const Post = mongoose.model('Post');

module.exports = {
    create: async (req, res, next) => {
        let newPost = new Post({
            uuid: uuidV4(),
            title: "some post",
            content: "post content"
        });
        await newPost.save();

        res.status(201);
        await res.json({
            "data": {
                "post": PostTransformer.transform(newPost)
            },
            "meta": {
                "total_count": await Post.count()
            }
        });
    }
};