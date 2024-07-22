const express = require("express");
const {
  getCar,
  getCars,
  createCar,
  editCar,
  deleteCar,
} = require("../controllers/car");
const { getModels, createModel } = require("../controllers/model");
const { getBrands, createBrand } = require("../controllers/brand");

const router = express.Router();

// Cars
router.get("/cars", getCars);
router.get("/cars/:id", getCar);
router.post("/cars", createCar);
router.put("/cars/:id", editCar);
router.delete("/cars/:id", deleteCar);

// car models
router.get("/models", getModels);
router.post("/models", createModel);

// car brands
router.get("/brands", getBrands);
router.post("/brands", createBrand);

module.exports = router;
