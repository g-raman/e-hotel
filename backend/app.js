const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const client = require("./db");

app.get("/customers", (req, res) => {
  client.query(`SELECT * FROM public."Customer"`, (err, result) => {
    if (!err) {
      res.send(result.rows);
    } else {
      console.log("hello");
    }
  });
  client.end;
});

app.use(bodyParser.json());

app.post("/customers", (req, res) => {
  const customer = req.body;
  console.log(customer);
  let insertQuery = `INSERT INTO public."Customer"("firstName", "lastName", "addressID", "idType")
            VALUES ('${customer.firstname}', '${customer.lastname}', '${customer.address}', '${customer.idType}');`;

  client.query(insertQuery, (err, result) => {
    if (!err) {
      res.send("Insertion Was Sucessful");
    } else {
      console.log("Insertion was not successful");
      console.log(err);
      res.status(400).json({
        data: {
          status: "error",
        },
      });
    }
  });
  client.end;
});

module.exports = app;
