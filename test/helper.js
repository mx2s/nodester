let DbConnection = require("../src/module/db/connection");

function beforeEach() {
    DbConnection.dropDatabase();
}

beforeEach();
