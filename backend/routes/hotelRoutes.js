const express = require("express");
const hotelController = require("../controllers/hotelController");

const router = express.Router();

router.route("/").get(hotelController.getAllHotels);

router.get("/capacityPerHotel", hotelController.getCapacityPerHotel);

module.exports = router;
