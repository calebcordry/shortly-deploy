var path = require('path');

var mongoose = require('mongoose');
//maybe make this an ENV variable?
mongoose.connect('mongodb://localhost:27017/shortly');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to mongoose.');
});

module.exports = db;
