const express = require("express");
const reservationController = require("../controllers/reservationController");

const router = express.Router();

router.route("/").get(reservationController.getAllReservations);

module.exports = router;
