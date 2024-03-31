const express = require("express");
const reservationController = require("../controllers/reservationController");

const router = express.Router();

router
  .route("/")
  .get(reservationController.getAllReservations)
  .post(reservationController.createReservation);

router.post("/defaultBook", reservationController.createDefaultRenting);

router
  .route("/:id")
  .delete(reservationController.deleteReservation)
  .patch(reservationController.convertToRenting);
module.exports = router;
