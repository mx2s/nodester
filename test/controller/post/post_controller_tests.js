let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../../server');
const PostFactory = require('../../../src/utils/factory/model/post/post_factory');

chai.use(chaiHttp);
chai.should();

let app = server.getApp();

describe("PostController", () => {
    describe("GET /api/v1/posts/get", () => {
        it("should return posts", async function () {
            let post = await PostFactory.createOne();
            chai.request(app)
                .get('/api/v1/posts/get')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');

                    res.body.data.posts.should.be.a('array');

                    chai.assert.equal(res.body.data.posts.length, 1);

                    let firstPost = res.body.data.posts[0];

                    firstPost.should.be.a('object');

                    chai.assert.equal(firstPost.uuid, post.uuid);
                    chai.assert.equal(firstPost.title, post.title);
                    chai.assert.equal(firstPost.content, post.content);
                });
        });
        it("should log stuff", async function () {
            console.log("log stuff");
        });
    });
});