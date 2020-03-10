let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../../../server');
const PostFactory = require('../../../../src/utils/factory/model/post/post_factory');

chai.use(chaiHttp);
chai.should();

let app = server.getApp();

describe("PostController", () => {
    describe("GET /api/v1/posts/get", () => {
        it("should return posts", async function () {
            chai.request(app)
                .get('/api/v1/posts/get')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');

                    res.body.data.posts.should.be.a('array');
                });
        });
    });
});