let express = require('express');
let router = express.Router();
let SimpleResponses = require('../utils/response/simple_responses');
let jwt = require('../module/auth/jwt');

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

        // --- POSTS ---

        // TODO: move to separate module
        router.get("/api/v1/posts/get", (req, res, next) => {
            jwt.isUserLoggedIn(req).then((authorized) => {
                if (authorized) {
                    next();
                } else {
                    SimpleResponses.error(res, "Not authorized", 401).then();
                }
            });
        }, PostController.getPosts);

        app.post("/api/v1/post/new", PostCrudController.create);

        app.get("/api/v1/post/get", PostCrudController.get);

        app.patch("/api/v1/post/edit", PostCrudController.edit);

        app.delete("/api/v1/post/delete", PostCrudController.delete);

        app.use('/', router);
    }
};