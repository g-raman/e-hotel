const express = require("express");
const hotelController = require("../controllers/hotelController");

const router = express.Router();

router.route("/").get(hotelController.getAllHotels);

router.get("/capacityPerHotel", hotelController.getCapacityPerHotel);
router.get("/availableRoomsByCity", hotelController.getAvailableRoomsByCity);
router.get("/allCities", hotelController.getAllCities);
router.get("/allViewTypes", hotelController.getViewTypes);
router.get("/search", hotelController.getHotelsAndFilter);
router.get("/bookedRooms", hotelController.getBookedRooms);
router.get("/chains", hotelController.getHotelChains);
router.get(
  "/bookedRoomsWithProblems",
  hotelController.getBookedRoomsWithProblems,
);

module.exports = router;
