var express = require('express');
var bodyParser = require('body-parser');
const cors = require("cors");
var db = require('../database-mongo');
//var Hash = require('./utils');

var app = express();

app.use(cors());
app.use(express.static(__dirname + '/../react-client/dist'));
app.use(bodyParser.json());


app.post('/user', function (req, res) {

  var salt = db.createRandom32String();// add salt to req ok
  var hash = db.createHash(req.body.password, salt)// change password ok
  req.body.password = hash
  req.body.salt = salt

  db.addUser(req.body, function (err, data) {//change createHash by req.body...ok
    if (err) {
      res.sendStatus(500);
    } else {
      res.send(true)
      //res.json(data);
      // res.render('signip');
    }
  });
});

app.get('/login', function (req, res) {
  db.getUser(req.query.username, function (err, user) {
    if (db.compareHash(req.query.password, user.password, user.salt)) {
      res.send(user)//modify...
    }
  })

})

app.post('/event', function (req, res) {

  db.addEvent(req.body, function (err, data) {//change req by req.body...
    if (err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
});

app.get('/events', function (req, res) {//get

  db.getEvents(function (err, data) {//change req by req.body...
    if (err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
});

app.get('/eventsByO', function (req, res) {//get

  db.getEventsByOrganizer(req.query.id, function (err, data) {//change req by req.body...
    if (err) {
      res.sendStatus(500);
    } else {
      console.log(data)
      res.json(data);
      res.end()

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


app.put('/addUserEvent', function (req, res) {

  db.addUserToEvent(req.body.idEvent, req.body.user, function (err, data) {
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

