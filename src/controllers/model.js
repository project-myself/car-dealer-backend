const { connection } = require("../db");

const getModels = (_, res) => {
  connection.query("SELECT * FROM model", (_, results) => {
    res.json(results);
  });
};

const createModel = (req, res) => {
  const { brand_id, name, fuel_type, engine_cc } = req.body;
  connection.query(
    "INSERT INTO model (brand_id, name, fuel_type, engine_cc) VALUES (?, ?, ?, ?)",
    [brand_id, name, fuel_type, engine_cc],
    (error, results) => {
      if (error) return res.json({ error });
      res.json(results);
    }
  );
};

module.exports = {
  getModels,
  createModel,
};
