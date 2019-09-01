const express = require('express');
const bodyParser = require('body-parser');
let DbConnection = require("./src/module/db/connection");
let appRoutes = require("./src/config/routes");

DbConnection.initDb();

const app = express();

let globalMiddleware = function (req, res, next) {
    console.log(req.url);
    next()
};

app.use(globalMiddleware);

process.on('unhandledRejection', error => {
    if (error.stack) {
        console.error(error.message);
        console.error(error.stack);
    }
});

app.use(bodyParser.urlencoded({
    extended: true
}));

const port = 8000;

appRoutes.init(app);

app.listen(port, () => {
    console.log('App started on port: ' + port);
});

module.exports = {
    getApp() {
        return app;
    }
};