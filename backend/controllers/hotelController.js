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

exports.getViewTypes = catchAsync(async (req, res, next) => {
  const query = `SELECT DISTINCT "viewType" FROM "Room" ORDER BY "viewType" ASC`;

  try {
    const results = await db.query(query);
    const flattened = results.rows.map((viewType) => viewType.viewType);
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

exports.getBookedRooms = catchAsync(async (req, res, next) => {
  const query = `
    SELECT 
    "Reservation"."roomID", "Reservation"."startDate", 
    "Reservation"."endDate",
    "firstName", "lastName", "problem"
    FROM "booked_rooms_employee"
    INNER JOIN "Reservation" ON 
    "Reservation"."reservationID" = "booked_rooms_employee"."reservationID"
    INNER JOIN "Customer" ON
    "Reservation"."customerID" = "Customer"."customerID"
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

exports.getHotelChains = catchAsync(async (req, res, next) => {
  const query = `SELECT "name" FROM "HotelChain"`;

  try {
    const results = await db.query(query);
    const flattened = results.rows.map((name) => name.name);
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
  const capacity = req.query.capacity || 1;
  const rating = req.query.rating || 3;
  const extendable = req.query.extendable || "";
  const chains = req.query.chains || "";

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
        "isExtendable",
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
        "isExtendable",
        "startDate",
        "endDate"
      )
    )

    WHERE
      "city" ~* $1
      AND "viewType" ~* $2
      AND "price" BETWEEN $3 AND $4
      AND (
        $5 NOT BETWEEN "startDate" AND "endDate"
        OR "startDate" IS NULL
      )
      AND (
        $6 NOT BETWEEN "startDate" AND "endDate"
        OR "endDate" IS NULL
      )
      AND "capacity" >= $7
      AND "starRating" >= $8
      AND "HotelChainName" ~* $9
  `;

  if (minPrice > maxPrice) {
    maxPrice = 1000;
  }

  const values = [
    city,
    viewType,
    minPrice,
    maxPrice,
    startDate,
    endDate,
    capacity,
    rating,
    chains,
  ];

  if (amenities) {
    query = query + `AND "amenities" ~* $${values.length + 1}`;
    values.push(amenities);
  }

  if (extendable === "TRUE") {
    query = query + `AND "isExtendable" = TRUE`;
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
