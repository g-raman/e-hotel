const db = require("../db");
const catchAsync = require("../utils/catchAsync");

exports.getAllHotels = catchAsync(async (req, res, next) => {
  const query = `
    SELECT "HotelChainName", "starRating", "numRooms", "email", "hotelPhoneNumber"
    FROM "Hotel";
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
      message: err.message,
    });
  }
});

exports.getCapacityPerHotel = catchAsync(async (req, res, next) => {
  const query = 'SELECT * FROM "capacity_per_hotel"';

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

exports.getAvailableRoomsByCity = catchAsync(async (req, res, next) => {
  const query = `
    SELECT * FROM "available_rooms_by_city" ORDER BY "availableRooms" DESC;
  `;

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
