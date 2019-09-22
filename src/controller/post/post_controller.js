let mongoose = require('mongoose');

const PostTransformer = require("../../transformer/post/post_transformer");

const Post = mongoose.model('Post');


module.exports = {
    getPosts: async (req, res) => {
        let posts = await Post.find({}).limit(10);
        await res.json({
            "data": {
                "posts": PostTransformer.transformMany(posts)
            },
        });
    }
};
