const express = require("express");
const amenitiesController = require("../controllers/amenitiesController");

const router = express.Router();

router.route("/").get(amenitiesController.getAllAmenities);

module.exports = router;
