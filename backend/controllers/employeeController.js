const catchAsync = require("../utils/catchAsync");
const db = require("../db");

exports.getAllEmployees = catchAsync(async (req, res, next) => {
  const query = `SELECT "hotelID", "firstName", "lastName", "role" FROM "Employee"`;

  try {
    const results = await db.query(query);
    res.status(200).json({
      status: "success",
      results: results.rows,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
});

exports.createEmployee = catchAsync(async (req, res, next) => {
  const employee = req.body;

  if (
    !employee.hotelID ||
    !employee.firstName ||
    !employee.lastName ||
    !employee.addressID ||
    !employee.role ||
    !employee.SIN
  ) {
    res.status(400).json({
      status: "error",
      message: "Ensure all parameters are passed.",
    });

    return next();
  }

  const insertQuery = `
    INSERT INTO "Employee" (
      "hotelID", "firstName", "lastName", "addressID", role, "SIN"
    ) VALUES (
      $1, $2, $3, $4, $5, $6
    );`;

  const values = [
    employee.hotelID,
    employee.firstName,
    employee.lastName,
    employee.addressID,
    employee.role,
    employee.SIN,
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

exports.deleteEmployeeByID = catchAsync(async (req, res, next) => {
  const id = req.params.id;

  const deleteQuery = `DELETE FROM "Employee" WHERE "SIN" = $1`;
  const values = [id];

  try {
    await db.query(deleteQuery, values);
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
