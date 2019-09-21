const join = require('path').join;
const fsUtils = require("./../../utils/fs/fs_utils");
const config = require("../../../config.json");

const appConfig = config[process.env.NODE_ENV];

let mongoose = require('mongoose');

const mongoDBurl = `mongodb://${appConfig.database.host}:${appConfig.database.port}/${appConfig.database.name}`;

let _connection;

const rootPath = join(__dirname, '../../..');

let modelPaths = fsUtils.getAllFilesRecursively("src/model", ".js");

modelPaths.forEach(file => require(join(rootPath, file)));

module.exports = {
    initDb() {
        mongoose.connect(mongoDBurl, { useNewUrlParser: true, useUnifiedTopology: true });
        _connection = mongoose.connection;

        _connection.on('open', () => {
            this.dropDatabase();
        });
        _connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
    },
    getConnection() {
        return _connection;
    },
    dropDatabase() {
        if (process.env.NODE_ENV === 'testing') {
            this.getConnection().dropDatabase()
        } else {
            console.warn('Database can only be dropped in testing environment, drop it manually')
        }
    }
};