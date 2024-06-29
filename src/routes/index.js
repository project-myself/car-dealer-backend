const express = require("express");
const { getCars } = require("../controllers/car");

const router = express.Router();

router.get("/cars", getCars);

module.exports = router;
