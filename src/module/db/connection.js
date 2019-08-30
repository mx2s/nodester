const join = require('path').join;
const fsUtils = require("./../../utils/fs/fs_utils");

let mongoose = require('mongoose');

const mongoDBurl = 'mongodb://127.0.0.1:27017/example_mongo'; // TODO: get from config

let _connection;

const rootPath = join(__dirname, '../../..');

let modelPaths = fsUtils.getAllFilesRecursively("src/model", ".js");

modelPaths.forEach(file => require(join(rootPath, file)));

module.exports = {
    initDb() {
        mongoose.connect(mongoDBurl, { useNewUrlParser: true });
        _connection = mongoose.connection;

        _connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
    },
    getConnection() {
        return _connection;
    }
};