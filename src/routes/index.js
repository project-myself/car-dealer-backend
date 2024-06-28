const db = require('../db');

module.exports = async (req, res) => {
    const cars = await db.getCars;
    res.send(cars);
};
