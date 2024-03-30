const db = require("../db");
const catchAsync = require("../utils/catchAsync");

exports.getAllAmenities = catchAsync(async (req, res, next) => {
  const query = `SELECT DISTINCT "amenity" FROM "RoomAmenities" ORDER BY "amenity" ASC`;

  try {
    const results = await db.query(query);
    const flattened = results.rows.map((amenity) => amenity.amenity);
    res.status(200).json({
      status: "success",
      data: {
        results: flattened,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
});
