const db = require("../db");
const catchAsync = require("../utils/catchAsync");

exports.getAllReservations = catchAsync(async (req, res, next) => {
  const query = `
    SELECT "reservationID", "customerID", "roomID", "startDate", "endDate", "rentingPrice"
    FROM "Reservation"
  `;

  try {
    const results = await db.query(query);
    res.status(200).json({
      status: "success",
      results: results.rows,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      messsage: err.messsage,
    });
  }
});
