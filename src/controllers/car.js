const { connection } = require("../db");

const getCars = (req, res) => {
  console.log(req.query);
  connection.query("SELECT * FROM car LIMIT 5", (_, results) => {
    res.json(results);
  });
};

const createCar = (req, res) => {
  const { name, model_id, plate_number, price } = req.body;
  connection.query(
    "INSERT INTO car (name, model_id, plate_number, price) VALUES (?, ?, ?, ?)",
    [name, model_id, plate_number, price],
    (error, results) => {
      if (error) return res.json({ error });
      res.json(results);
    }
  );
};

module.exports = {
  getCars,
  createCar,
};
