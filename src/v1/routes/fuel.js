const router = require("express").Router();
const FuelRequestController = require("../controllers/FuelRequestController");

router.post('/fuelrequest/:id', FuelRequestController.FuelRequest)

module.exports = router;