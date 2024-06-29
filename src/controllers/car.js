const { connection } = require("../db");

const getCars = (_, res) => {
  connection.query("SELECT * FROM car", (_, results) => {
    res.json(results);
  });
};

module.exports = {
  getCars,
};
