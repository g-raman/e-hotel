const { Client } = require("pg");

const client = new Client({
    user: "postgres",
    host: "localhost",
    port: 5432,
    password: "Aryan2004",
    database: "e-hotel"
});

module.exports = client;