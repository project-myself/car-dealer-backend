const express = require("express");
const app = express();
const db = require("./db");
const routes = require("./routes");

app.use(express.json());
app.use(routes);

app.listen(3000, () => {
  console.log("Listening on port 3000");
  db.init();
});
