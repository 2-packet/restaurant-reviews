const path = require('path');
const cors = require('cors');
const express = require('express');
const db = require('../database/index.js');

const app = express();

app.use(cors());
app.use(express.static(path.resolve(__dirname, '../public')));

app.get('/:id', (req, res) => {
  if (!req.params.id) {
    res.status(400);
    res.end();
  } else {
    res.sendFile('index.html', { root: path.resolve(__dirname, '../public') });
  }
});

app.get('/:id/summary', (req, res) => {
  db.getSummary(req.params.id, (err, result) => {
    if (err) {
      res.status(500);
      res.end();
    } else {
      res.status(200);
      res.send(result);
    }
  });
});

app.get('/:id/reviews', (req, res) => {
  db.getAllReviews(req.params.id, (err, result) => {
    console.log("HELLO, ITS ME");
    if (err) {
      res.status(500);
      res.end();
    } else {
      res.status(200);
      res.send(result);
    }
  });
});

module.exports = app;
