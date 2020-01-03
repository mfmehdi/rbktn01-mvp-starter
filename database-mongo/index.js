var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test');

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
  description: String,
  date: Date,
  participants: [String],
  organizerId: String,
  type: String,
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

var addEvent = function (event, callback) {
  Event.create(event, function (err, event) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, event);
    }
  });
};

var getEventsByOrganizer = function (organizerId, callback) {
  Event.find({ organizerId: organizerId }, function (err, event) {
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

module.exports.addUser = addUser;
module.exports.addEvent = addEvent;
module.exports.getEventsByOrganizer = getEventsByOrganizer;
module.exports.getEventsByUser = getEventsByUser;
