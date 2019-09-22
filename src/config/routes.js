let express = require('express');
let router = express.Router();

let apiMiddleware = require('../middleware/groups/api');

const AuthController = require("./../controller/auth/auth_controller");
const PostController = require("./../controller/post/post_controller");
const PostCrudController = require("./../controller/post/post_crud_controller");

module.exports = {
    init(app) {
        app.get("/", (req, res) => {
            res.json({
                "data": {
                    "status": "ok",
                    "api_version": 1
                }
            });
        });

        router.get("/api/v1/auth/login/get", AuthController.login);

        // --- POSTS ---

        router.get("/api/v1/posts/get", PostController.getPosts);

        router.get("/api/v1/post/get", PostCrudController.get);

        router.post("/api/v1/post/new", apiMiddleware.get, PostCrudController.create);

        router.patch("/api/v1/post/edit", apiMiddleware.get, PostCrudController.edit);

        router.delete("/api/v1/post/delete", apiMiddleware.get, PostCrudController.delete);

        app.use('/', router);
    }
};