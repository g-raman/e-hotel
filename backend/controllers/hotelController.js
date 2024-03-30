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
  const query = `SELECT * FROM "available_rooms_by_city" ORDER BY "availableRooms" DESC;`;

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

exports.getAllCities = catchAsync(async (req, res, next) => {
  const query = `SELECT "city" FROM "available_rooms_by_city";`;

  try {
    const results = await db.query(query);
    const flattened = results.rows.map((city) => city.city);
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

exports.getHotelsAndFilter = catchAsync(async (req, res, next) => {
  const TODAY = new Date().toLocaleDateString("en-CA");

  const city = req.query.city || "";
  const viewType = req.query.viewType || "";
  const amenities = req.query.amenities || "";
  const minPrice = req.query.minPrice || 0;
  let maxPrice = req.query.maxPrice || 1000;
  const startDate = req.query.startDate || TODAY;
  const endDate = req.query.endDate || TODAY;

  let query = `
    SELECT * FROM (
      SELECT 
        "hotelID",
        "HotelChainName",
        "roomID",
        "starRating",
        "capacity",
        "viewType",
        "price",
        "city",
        "province",
        "startDate",
        "endDate",
        STRING_AGG("amenity"::TEXT, ',') AS "amenities"
      FROM "all_room_info"

      GROUP BY (
        "hotelID",
        "HotelChainName",
        "roomID",
        "starRating",
        "capacity",
        "viewType",
        "price",
        "city",
        "province",
        "startDate",
        "endDate"
      )
    )

    WHERE
      "HotelChainName" ~* ''
      AND	"city" ~* $1
      AND "viewType" ~* $2
      AND "price" BETWEEN $3 AND $4
      AND ("startDate" != $5
        OR "startDate" IS NULL
      )
      AND ("endDate" != $6
        OR "endDate" IS NULL
      )
  `;

  if (minPrice > maxPrice) {
    maxPrice = minPrice;
  }
  const values = [city, viewType, minPrice, maxPrice, startDate, endDate];

  if (amenities) {
    query = query + `AND "amenities" ~* $${values.length + 1}`;
    values.push(amenities);
  }

  try {
    const results = await db.query(query, values);

    res.status(200).json({
      status: "success",
      data: results.rows,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
});
