let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../../../server');

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
});