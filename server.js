const express = require('express');
let DbConnection = require("./src/module/db/connection");

const PostController = require("./src/controller/post/post_controller");
const PostCrudController = require("./src/controller/post/post_crud_controller");

DbConnection.initDb();

const app = express();

const port = 8000;

app.get("/", (req, res) => {
    res.json({
        "data": {
            "status": "ok",
            "api_version": 1
        }
    });
});

app.get("/api/v1/posts/get", PostController.getPosts);

app.post("/api/v1/post/new", PostCrudController.create);

app.listen(port, () => {
    console.log('App started on port: ' + port);
});
