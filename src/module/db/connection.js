const fs = require('fs');
const join = require('path').join;

let mongoose = require('mongoose');

const mongoDBurl = 'mongodb://127.0.0.1:27017/example_mongo'; // TODO: get from config

let _connection;

const models = join(__dirname, '../../model');

// Bootstrap models
fs.readdirSync(models)
    .filter(file => ~file.search(/^[^.].*\.js$/))
    .forEach(file => require(join(models, file)));

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