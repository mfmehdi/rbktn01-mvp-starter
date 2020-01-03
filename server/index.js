var express = require('express');
var bodyParser = require('body-parser');


var db = require('../database-mongo');
var Hash = require('./utils');
var app = express();
app.use(express.static(__dirname + '/../react-client/dist'));

app.post('/user', function (req, res) {
  db.addUser(req, function (err, data) {//change req by req.body...
    if (err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
});

app.post('/event', function (req, res) {
  db.addEvent(req, function (err, data) {//change req by req.body...
    if (err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
});

app.get('/eventsByO', function (req, res) {
  db.getEventsByOrganizer(req, function (err, data) {//change req by req.body...
    if (err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
});

app.get('/eventsByUser', function (req, res) {
  db.getEventsByUser(req, function (err, data) {//change req by req.body...
    if (err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
});

app.listen(3333, function () {
  console.log('listening on port 3333!');
});

