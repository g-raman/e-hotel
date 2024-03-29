const express = require("express");
const bodyParser = require("body-parser");
const client = require("./db");
const customerRouter = require("./routes/customerRoutes");
const employeeRouter = require("./routes/employeeRoutes");
const reservationRouter = require("./routes/reservationRoutes");

const app = express();

app.use(bodyParser.json());
app.use("/api/v1/customers", customerRouter);
app.use("/api/v1/employees", employeeRouter);
app.use("/api/v1/reservations", reservationRouter);

module.exports = app;
