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
    !reservation.endDate ||
    !reservation.creditCardNumber ||
    !reservation.creditCardExpiry ||
    !reservation.creditCardCVV ||
    !reservation.status
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
      "customerID", "roomID", "startDate", "endDate", "rentingPrice",
      "creditCardNumber", "creditCardExpiry", "creditCardCVV", "status"
    ) VALUES (
      $1, $2, $3, $4, $5, $6, $7, $8, $9
    );`;
  const values = [
    reservation.customerID,
    reservation.roomID,
    reservation.startDate,
    reservation.endDate,
    roomPrice,
    reservation.creditCardNumber,
    reservation.creditCardExpiry,
    reservation.creditCardCVV,
    reservation.status,
  ];

  try {
    console.log("here");
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

exports.deleteReservation = catchAsync(async (req, res, next) => {
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
  const reservation = req.body;

  if (
    !reservation.creditCardNumber ||
    !reservation.creditCardExpiry ||
    !reservation.creditCardCVV
  ) {
    res.status(400).json({
      status: "error",
      message: "Ensure all parameters are passed in",
    });
    return next();
  }

  const query = `
    UPDATE "Reservation" 
    SET 
    "status" = 'renting', "creditCardNumber" = $2,
    "creditCardExpiry" = $3, "creditCardCVV" = $4
    WHERE "reservationID" = $1;`;
  const values = [
    id,
    reservation.creditCardNumber,
    reservation.creditCardExpiry,
    reservation.creditCardCVV,
  ];

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

exports.createDefaultRenting = catchAsync(async (req, res, next) => {
  const info = req.body;

  if (!info.roomID || !info.startDate || !info.endDate) {
    res.status(400).json({
      status: "error",
      message: "Ensure all parameters are passed in",
    });

    return next();
  }

  const roomPriceQuery = `SELECT "price" FROM "Room" WHERE "roomID" = $1`;
  let roomPrice;

  try {
    const results = await db.query(roomPriceQuery, [info.roomID]);
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

  const insertQuery = `
    INSERT INTO "Reservation" (
      "customerID", "roomID", "startDate", "endDate", "rentingPrice", "status"
    ) VALUES (
      $1, $2, $3, $4, $5, $6
    );`;
  const values = [
    "1",
    info.roomID,
    info.startDate,
    info.endDate,
    roomPrice,
    "booked",
  ];

  try {
    await db.query(insertQuery, values);
    res.status(200).json({
      status: "success",
      message: "Booking created successfully",
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
