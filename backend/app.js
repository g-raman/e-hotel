const express = require("express");
const bodyParser = require("body-parser");
const client = require("./db");
const customerRoutes = require("./routes/customerRoutes");

const app = express();

app.use(bodyParser.json());
app.use("/api/v1/customers", customerRoutes);

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
});

app.post("/employees", (req, res) => {
  const employee = req.body;
  console.log(employee);

  let insertQuery = `INSERT INTO public."Employee"(
      "hotelID", "firstName", "lastName", "addressID", role, "SIN"
    )
    VALUES (
      '${employee.hotelID}', '${employee.firstName}', '${employee.lastName}',
      '${employee.addressID}', '${employee.role}', '${employee.SIN}'
    );`;

  client.query(insertQuery, (err, result) => {
    if (!err) {
      res.send("Employee Insertion Was Sucessful");
    } else {
      console.log("Employee Insertion was not successful");
      console.log(err);
      res.status(400).json({
        data: {
          status: "error",
          message: "Employee Insertion was not successful",
        },
      });
    }
  });
});

module.exports = app;
