const express = require("express");
const client = require("./db");
const app = require("./app");
const bodyParser = require("body-parser");
const PORT = 8080;

client.connect(function (err) {
  if (err) {
    console.log(err);
    throw err;
  }
  console.log("Connected!");
});

const server = app.listen(PORT, () => {
  console.log("Server listening on PORT", PORT);
});
