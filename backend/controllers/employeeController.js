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
