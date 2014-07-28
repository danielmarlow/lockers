'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var LockerSchema = new Schema({
  slot: String, // The locker's slot number
  size: String,   // small, medium, large
  inUse: Boolean  // Is something in the locker?
});

module.exports = mongoose.model('Locker', LockerSchema);
