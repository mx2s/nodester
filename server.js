const express = require('express');

var mongoose = require('mongoose');

var mongoDB = 'mongodb://127.0.0.1:27017/example_mongo';
mongoose.connect(mongoDB, { useNewUrlParser: true });

let db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

db.on('open', function() {
    var r = db.collection('example_mongo').find({});
});

const app = express();

const port = 8000;

app.get("/", (req, res, next) => {
    res.json(["Tony","Lisa","Michael","Ginger","Food"]);
});

app.get("/post/new", (req, res, next) => {
    res.json({
        "status": 200,
        "data": {}
    });
});

app.listen(port, () => {
    console.log('App started on port: ' + port);
});
