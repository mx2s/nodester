const uuidV4 = require('uuid/v4');
let mongoose = require('mongoose');
const SimpleResponses = require('../../utils/response/simple_responses');

const ValidationErrorsTransformer = require("../../transformer/error/validation_errors_transformer");
const PostTransformer = require("../../transformer/post/post_transformer");

const Post = mongoose.model('Post');

module.exports = {
    create: async (req, res) => {
        let newPost = new Post({
            uuid: uuidV4(),
            title: req.body.title,
            content: req.body.content
        });
        await newPost.save(function (err) {
            if (!err) {
                return;
            }
            res.status(422);
            res.json(ValidationErrorsTransformer.transform(err));
            res.end();
        });

        res.status(201);
        await res.json({
            "data": {
                "post": PostTransformer.transform(newPost)
            },
            "meta": {
                "total_count": await Post.count()
            }
        });
    },
    get: async (req, res) => {
        let post = null;
        await Post.findOne({uuid: req.query.uuid}, function (err, item) {
            post = item;
        });
        if (!post) {
            await SimpleResponses.error(res, "Post not found", 404);
            return;
        }

        await res.json({
            "data": {
                "post": PostTransformer.transform(post)
            }
        });
    },
    edit: async (req, res) => {
        let post = null;
        await Post.findOne({uuid: req.body.uuid}, function (err, item) {
            post = item;
        });
        if (!post) {
            await SimpleResponses.error(res, "Post not found", 404);
            return;
        }

        post.title = req.body.title;
        post.content = req.body.content;

        await post.save(function (err) {
            console.log(err);
        });

        await res.json({
            "data": {
                "post": PostTransformer.transform(post)
            }
        });
    },
    delete: async (req, res) => {
        let post = null;
        await Post.findOne({uuid: req.body.uuid}, function (err, item) {
            post = item;
        });
        if (!post) {
            await SimpleResponses.error(res, "Post not found", 404);
            return;
        }
        await res.json({
            "data": {
                "deleted_post": null
            }
        });
    }
};