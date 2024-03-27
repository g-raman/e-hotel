const express = require("express");
const reservationController = require("../controllers/reservationController");

const router = express.Router();

router
  .route("/")
  .get(reservationController.getAllReservations)
  .post(reservationController.createReservation);

router.route("/:id").delete(reservationController.deleteReservationByID);
module.exports = router;
