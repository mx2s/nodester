let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../../../server');
let mongoose = require('mongoose');

const uuidV4 = require('uuid/v4');
const PostFactory = require('../../../../src/utils/factory/model/post/post_factory');

chai.use(chaiHttp);
chai.should();

let app = server.getApp();

describe("PostCrudController", () => {
    describe("GET /api/v1/post/get", () => {
        it("should return post", async function () {
            let post = await PostFactory.createOne();
            chai.request(app)
                .get('/api/v1/post/get?uuid=' + post.uuid)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');

                    res.body.data.post.should.be.a('object');

                    let firstPost = res.body.data.post;

                    firstPost.should.be.a('object');

                    chai.assert.equal(firstPost.uuid, post.uuid);
                    chai.assert.equal(firstPost.title, post.title);
                    chai.assert.equal(firstPost.content, post.content);
                });
        });
        it("should return 404 if post does not exist", async function () {
            chai.request(app)
                .get('/api/v1/post/get?uuid=' + uuidV4())
                .end((err, res) => {
                    res.should.have.status(404);
                });
        });
    });
    describe("POST /api/v1/post/new", () => {
        it("should create post", async function () {
            let newTitle = "new title";
            let newContent = "new content";

            chai.request(app)
                .post('/api/v1/post/new')
                .type('form')
                .send({
                    title: newTitle,
                    content: newContent
                })
                .end((err, res) => {
                    res.should.have.status(201);

                    let responsePost = res.body.data.post;

                    responsePost.should.be.a('object');

                    chai.assert.equal(responsePost.title, newTitle);
                    chai.assert.equal(responsePost.content, newContent);


                    mongoose.model('Post').findOne({uuid: responsePost.uuid}, function (err, createdPost) {
                        chai.assert.equal(responsePost.uuid, createdPost.uuid);
                    });
                });
        });
    });
    describe("PATCH /api/v1/post/edit", () => {
        it("should delete post", async function () {
            let post = await PostFactory.createOne();

            let newTitle = "updated title";
            let newContent = "updated content";

            chai.request(app)
                .patch('/api/v1/post/edit?uuid=' + post.uuid)
                .type('form')
                .send({
                    title: newTitle,
                    content: newContent
                })
                .end((err, res) => {
                    res.should.have.status(200);

                    let responsePost = res.body.data.post;

                    responsePost.should.be.a('object');

                    chai.assert.equal(responsePost.uuid, post.uuid);
                    chai.assert.equal(responsePost.title, newTitle);
                    chai.assert.equal(responsePost.content, newContent);
                    chai.assert.should.not.equal(responsePost.title, post.title);
                    chai.assert.should.not.equal(responsePost.content, post.content);
                });
        });
        it("should return 404 if post does not exist", async function () {
            chai.request(app)
                .patch('/api/v1/post/edit?uuid=' + uuidV4())
                .end((err, res) => {
                    res.should.have.status(404);
                });
        });
    });
    describe("DELETE /api/v1/post/delete", () => {
        it("should delete post", async function () {
            let post = await PostFactory.createOne();
            chai.request(app)
                .delete('/api/v1/post/delete?uuid=' + post.uuid)
                .end((err, res) => {
                    res.should.have.status(200);
                });
        });
        it("should return 404 if post does not exist", async function () {
            chai.request(app)
                .delete('/api/v1/post/delete?uuid=' + uuidV4())
                .end((err, res) => {
                    res.should.have.status(404);
                });
        });
    });
});