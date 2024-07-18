const express = require("express");
const { getCars, createCar } = require("../controllers/car");
const { getModels, createModel } = require("../controllers/model");
const { getBrands, createBrand } = require("../controllers/brand");

const router = express.Router();

// Cars
router.get("/cars", getCars);
router.post("/cars", createCar);

// car models
router.get("/models", getModels);
router.post("/models", createModel);

// car brands
router.get("/brands", getBrands);
router.post("/brands", createBrand);

module.exports = router;
