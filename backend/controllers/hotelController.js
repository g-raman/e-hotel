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
