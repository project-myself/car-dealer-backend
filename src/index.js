const express = require('express');
const app = express();
const db = require('./db');
const routes = require('./routes');

app.use(express.json());
// app.use(express.static(__dirname + '/static'));

app.get('/cars', routes);

db.init()
    .then(() => {
        app.listen(3000, () => console.log('Listening on port 3000'));
    })
    .catch((err) => {
        console.error(err);
        process.exit(1);
    });
