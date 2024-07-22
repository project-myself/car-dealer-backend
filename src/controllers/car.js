const { pick } = require("lodash");
const { connection } = require("../db");

const getCars = (req, res) => {
  const {
    limit = 5,
    offset = 0,
    order_by = "name",
    order_direction = "ASC",
  } = req.query;
  connection.query(
    `
      SELECT * FROM car ORDER BY ${order_by} ${order_direction} LIMIT ${limit} OFFSET ${offset};
      SELECT COUNT(id) AS total FROM car;
    `,
    (error, results) => {
      const response = {
        data: results[0],
        total: results[1][0]?.total,
        limit: Number(limit),
        offset: Number(offset),
        order_by,
        order_direction,
      };
      if (error) return res.json({ error });
      return res.json(response);
    }
  );
};

const getCar = (req, res) => {
  const {
    params: { id },
  } = req;
  connection.query(
    `
      SELECT car.name, car.plate_number, car.price, model.name, model.fuel_type, model.engine_cc
      FROM car
      INNER JOIN model ON car.model_id = model.id
      WHERE car.id = ${id};
    `,
    (error, results) => {
      if (error) return res.json({ error });
      return res.json(results);
    }
  );
};

const createCar = (req, res) => {
  const newCar = pick(req.body, ["name", "model_id", "plate_number", "price"]);
  connection.query("INSERT INTO car SET ?", newCar, (error, results) => {
    if (error) return res.json({ error });
    res.json(results);
  });
};

const editCar = (req, res) => {
  const {
    params: { id },
  } = req;
  const newCar = pick(req.body, ["name", "model_id", "plate_number", "price"]);
  connection.query(
    "UPDATE car SET ? WHERE id = ?",
    [newCar, id],
    (error, results) => {
      if (error) return res.json({ error });
      res.json(results);
    }
  );
};

const deleteCar = (req, res) => {
  const {
    params: { id },
  } = req;
  connection.query("DELETE FROM car WHERE id = ?", id, (error, results) => {
    if (error) return res.json({ error });
    res.json(results);
  });
};

module.exports = {
  getCars,
  getCar,
  createCar,
  editCar,
  deleteCar,
};
