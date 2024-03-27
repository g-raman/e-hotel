const db = require("../db");
const catchAsync = require("../utils/catchAsync");

exports.getAllCustomers = catchAsync(async (req, res, next) => {
  const query = `SELECT "firstName", "lastName" FROM "Customer"`;

  try {
    const results = await db.query(query);
    res.status(200).json({
      status: "success",
      data: {
        results: results.rows,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
});

exports.createCustomer = catchAsync(async (req, res, next) => {
  const customer = req.body;

  if (
    !customer.firstName ||
    !customer.lastName ||
    !customer.address ||
    !customer.idType
  ) {
    res.status(400).json({
      status: "error",
      message: "Ensure all parameters are passed in.",
    });

    return next();
  }

  const insertQuery = `
    INSERT INTO "Customer" (
      "firstName", "lastName", "addressID", "idType"
      ) VALUES (
       $1, $2, $3, $4
      );`;

  const values = [
    customer.firstName,
    customer.lastName,
    customer.address,
    customer.idType,
  ];

  try {
    await db.query(insertQuery, values);
    res.status(201).json({
      status: "success",
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
});

exports.deleteCustomer = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const query = `DELETE FROM "Customer" WHERE "customerID" = $1`;
  const values = [id];

  try {
    await db.query(query, values);
    res.status(204).json({
      status: "success",
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
});
