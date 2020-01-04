var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/hiking_db');

var db = mongoose.connection;

db.on('error', function () {
  console.log('mongoose connection error');
});

db.once('open', function () {
  console.log('mongoose connected successfully');
});

var userSchema = mongoose.Schema({
  name: String,
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  salt: String,
  type: String,
});

var User = mongoose.model('User', userSchema);

var eventSchema = mongoose.Schema({
  des: String,
  date: Date,
  nb: Number,
  participants: [String],
  organizerId: String,
  placeDep: String
});

var Event = mongoose.model('Event', eventSchema);

// var selectAll = function (callback) {
//   User.find({}, function (err, Users) {
//     if (err) {
//       callback(err, null);
//     } else {
//       callback(null, Users);
//     }
//   });
// };

var addUser = function (user, callback) {

  User.create(user, function (err, user) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, user);
    }
  });
};

var getUser = function (username, callback) {
  User.findOne({ username: username }, function (err, user) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, user);
    }
  });
};



//**********************event */
var getEvents = function (callback) {
  Event.find({}, function (err, events) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, events);
    }
  });
};

var addEvent = function (event, callback) {
  Event.create(event, function (err, event) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, event);
    }
  });
};
var getEventsByOrganizer = function (organizerI, callback) {
  Event.find({ organizerId: organizerI }, function (err, event) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, event);
    }
  });
};

var getEventsByUser = function (userId, callback) {
  Event.find({ participants: userId }, function (err, event) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, event);
    }
  });
};

var addUserToEvent = function (idEvent, idUser, callback) {
  Event.findOneAndUpdate({ _id: idEvent }, { $addToSet: { participants: idUser }, $inc: { nb: -1 } }, {
    new: true
  }, function (err, event) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, event);
    }
  });
};
const crypto = require('crypto');

module.exports.createHash = (data, salt = '') => {
  let shasum = crypto.createHash('sha256');
  shasum.update(data + salt);
  return shasum.digest('hex');
};

module.exports.compareHash = (attempted, stored, salt) => {

  return stored === this.createHash(attempted, salt);
};

module.exports.createRandom32String = () => {
  return crypto.randomBytes(32).toString('hex');
};
module.exports.getUser = getUser;
module.exports.addUser = addUser;
module.exports.addEvent = addEvent;
module.exports.getEventsByOrganizer = getEventsByOrganizer;
module.exports.getEventsByUser = getEventsByUser;
module.exports.getEvents = getEvents;
module.exports.addUserToEvent = addUserToEvent;
