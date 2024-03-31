const db = require("../db");
const catchAsync = require("../utils/catchAsync");

exports.getAllReservations = catchAsync(async (req, res, next) => {
  const query = `
    SELECT "reservationID", "customerID", "roomID", "startDate", "endDate", "rentingPrice", "status"
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
    !reservation.endDate
  ) {
    res.status(400).json({
      status: "error",
      message: "Ensure all parameters passed in.",
    });

    return next();
  }

  const roomPriceQuery = `SELECT "price" FROM "Room" WHERE "roomID" = $1`;
  let roomPrice;

  try {
    const results = await db.query(roomPriceQuery, [reservation.roomID]);
    if (results.rowCount != 1) {
      res.status(400).json({
        status: "error",
        message: "Room not found",
      });
      return next();
    }
    roomPrice = results.rows[0].price;
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: err.message,
    });

    return next();
  }

  const customerQuery = `SELECT * FROM "Customer" WHERE "customerID" = $1`;

  try {
    const results = await db.query(customerQuery, [reservation.customerID]);
    if (results.rowCount != 1) {
      res.status(400).json({
        status: "error",
        message: "Customer not found",
      });
      return next();
    }
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: err.message,
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
    roomPrice,
  ];

  try {
    await db.query(insertQuery, values);
    res.status(200).json({
      status: "success",
      message: "Room created successfully",
    });
  } catch (err) {
    const message =
      err.code === "23505"
        ? "Room is booked for that date range."
        : err.message;

    res.status(400).json({
      status: "error",
      message,
    });
  }
});

exports.deleteReservationByID = catchAsync(async (req, res, next) => {
  const id = req.params.id;

  const deleteQuery = `DELETE FROM "Reservation" WHERE "reservationID" = $1`;
  const values = [id];

  try {
    await db.query(deleteQuery, values);
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

exports.convertToRenting = catchAsync(async (req, res, next) => {
  const id = req.params.id;

  const query = `UPDATE "Reservation" SET "status" = 'renting' WHERE "reservationID" = $1;`;
  const values = [id];

  try {
    await db.query(query, values);
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
