const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const client = require("./db");
const customerRouter = require("./routes/customerRoutes");
const employeeRouter = require("./routes/employeeRoutes");
const reservationRouter = require("./routes/reservationRoutes");
const hotelRouter = require("./routes/hotelRoutes");
const amenitiesRouter = require("./routes/amenitiesRoutes");

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use("/api/v1/customers", customerRouter);
app.use("/api/v1/employees", employeeRouter);
app.use("/api/v1/reservations", reservationRouter);
app.use("/api/v1/hotels", hotelRouter);
app.use("/api/v1/amenities", amenitiesRouter);

module.exports = app;
