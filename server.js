const express = require('express');
const fs = require('fs');
const join = require('path').join;
const uuidV4 = require('uuid/v4');

let mongoose = require('mongoose');

const models = join(__dirname, 'src/model');

// Bootstrap models
fs.readdirSync(models)
    .filter(file => ~file.search(/^[^.].*\.js$/))
    .forEach(file => require(join(models, file)));

const Post = mongoose.model('Post');

const mongoDBurl = 'mongodb://127.0.0.1:27017/example_mongo';

mongoose.connect(mongoDBurl, { useNewUrlParser: true });

let db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const app = express();

const port = 8000;

app.get("/", (req, res, next) => {
    res.json({
        "status": 200,
        "data": {}
    });
});

app.get("/api/v1/posts/get", async (req, res, next) => {
    await res.json({
        "status": 201,
        "data": {
            "posts": await Post.find({})
        },
    });
});

app.post("/api/v1/post/new", async (req, res, next) => {
    let newPost = new Post({
        uuid: uuidV4(),
        title: "some post",
        content: "post content"
    });
    await newPost.save();

    await res.json({
        "status": 201,
        "data": {
            "post": newPost
        },
        "meta": {
            "total_count": await Post.count()
        }
    });
});

app.listen(port, () => {
    console.log('App started on port: ' + port);
});
