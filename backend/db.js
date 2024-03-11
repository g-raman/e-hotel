const { Client } = require("pg");
require("dotenv").config();

const client = new Client({
    user: "postgres",
    host: "localhost",
    port: 5432,
    password: process.env.PASSWORD,
    database: "e-hotel"
});

module.exports = client;