const express = require('express');
const fs = require('fs');
const join = require('path').join;
const uuidv1 = require('uuid/v1');

var mongoose = require('mongoose');

const models = join(__dirname, 'src/model');

// Bootstrap models
fs.readdirSync(models)
    .filter(file => ~file.search(/^[^.].*\.js$/))
    .forEach(file => require(join(models, file)));

const Post = mongoose.model('Post');

var mongoDBurl = 'mongodb://127.0.0.1:27017/example_mongo';

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

app.get("/post/new", (req, res, next) => {
    var newPost = new Post({
        uuid: uuidv1(),
        title: "some post",
        content: "post content"
    });
    newPost.save();

    res.json({
        "status": 201,
        "data": {
            "post": newPost
        },
        "meta": {
            "total_count": 0
        }
    });
});

app.listen(port, () => {
    console.log('App started on port: ' + port);
});
