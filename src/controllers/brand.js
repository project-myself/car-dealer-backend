const { connection } = require("../db");

const getBrands = (_, res) => {
  connection.query("SELECT * FROM brand", (error, results) => {
    if (error) return res.json({ error });
    res.json(results);
  });
};

const createBrand = (req, res) => {
  const { name } = req.body;
  connection.query(
    "INSERT INTO brand (name) VALUES (?)",
    [name],
    (error, results) => {
      if (error) return res.json({ error });
      res.json(results);
    }
  );
};

module.exports = {
  getBrands,
  createBrand,
};
