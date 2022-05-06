"use strict";
// const Pool = require('pg').Pool;
// import pg from 'pg';
// const pool = new pg.Pool()
Object.defineProperty(exports, "__esModule", { value: true });
// const pool1 = new pool({
// user: "postgres",
// password: "7905",
// database: "todo_database",
// host: "localhost",
// port: 5432 
// });
const pg_1 = require("pg");
const pool = new pg_1.Pool({
    user: "postgres",
    password: "7905",
    database: "todo_database",
    host: "localhost",
    port: 5432
});
exports.default = pool;
//# sourceMappingURL=db.js.map