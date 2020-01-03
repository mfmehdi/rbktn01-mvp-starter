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
  console.log('before create')
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

app.post('/login', function (req, res) {
  //req contain password , username
  //console.log(req)
  db.getUser(req.body.username, function (err, user) {
    // console.log('password  ', req.body.password, 'salt ', user.salt)
    // console.log(db.compareHash(req.body.password, user.password, user.salt))

    if (db.compareHash(req.body.password, user.password, user.salt)) {
      console.log('ok')
      res.send(user.id)//modify...
    }
  })

})
app.post('/event', function (req, res) {
  console.log(req.body)
  db.addEvent(req.body, function (err, data) {//change req by req.body...
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

