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

exports.createReservation = catchAsync(async (req, res, next) => {
  const reservation = req.body;

  if (
    !reservation.customerID ||
    !reservation.roomID ||
    !reservation.startDate ||
    !reservation.endDate ||
    !reservation.rentingPrice
  ) {
    res.status(400).json({
      status: "error",
      message: "Ensure all parameters passed in.",
    });

    return next();
  }

  const insertQuery = `
    INSERT INTO "Reservation" (
      "customerID", "roomID", "startDate", "endDate", "rentingPrice"
    ) VALUES (
      $1, $2, $3, $4, $5
    );`;
  const values = [
    reservation.customerID,
    reservation.roomID,
    reservation.startDate,
    reservation.endDate,
    reservation.rentingPrice,
  ];

  try {
    await db.query(insertQuery, values);
    res.status(204).json({
      status: "success",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
});
