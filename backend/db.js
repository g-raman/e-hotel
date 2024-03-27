const fs = require("fs");
const { Client } = require("pg");
require("dotenv").config();

const client = new Client({
  host: process.env.RDS_HOSTNAME,
  user: process.env.RDS_USERNAME,
  password: process.env.RDS_PASSWORD,
  port: process.env.RDS_PORT,
  database: process.env.RDS_DATABASE,
  ssl: {
    ca: fs.readFileSync("./ca-central-1-bundle.pem"),
  },
});

// (async () => await client.connect())();

module.exports = client;

