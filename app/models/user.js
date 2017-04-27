var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');
const mongoose = require('mongoose');

var Schema = mongoose.Schema;



var userSchema = new Schema({
  username: String,
  password: String,
  timestamp: {
    type: Date, default: Date.now
  }
});

userSchema.pre('save', function(next) {
  var cipher = Promise.promisify(bcrypt.hash);
  return cipher(this.get('password'), null, null).bind(this)
    .then((hash) => {
      this.set('password', hash);
      next();
    });
});

userSchema.methods.comparePassword = function(attemptedPassword, callback) {
  bcrypt.compare(attemptedPassword, this.get('password'), function(err, isMatch) {
    callback(isMatch);
  });
};

const User = mongoose.model('User', userSchema);

module.exports = User;
