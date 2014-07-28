'use strict';

var _ = require('lodash');
var Locker = require('./locker.model');

// Get list of lockers
exports.index = function(req, res) {
  console.log('lockers index function');
  Locker.find(function (err, lockers) {
    if(err) { return handleError(res, err); }
    return res.json(200, lockers);
  });
};

// Get a single locker
exports.show = function(req, res) {
  Locker.findOne({slot: req.params.id}, function (err, locker) {
    if(err) { return handleError(res, err); }
    if(!locker) { return res.send(404); }
    return res.json(locker);
  });
};

// Get a single locker by its number
exports.showNumber = function(req, res) {
  Locker.findOne({'number': req.params.number}, function (err, locker) {
    if(err) { return handleError(res, err); }
    if(!locker) { return res.send(404); }
    return res.json(locker);
  });
};

// Creates a new locker in the DB.
exports.create = function(req, res) {
  Locker.create(req.body, function(err, locker) {
    if(err) { return handleError(res, err); }
    return res.json(201, locker);
  });
};

// Updates an existing locker in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Locker.findById(req.params.id, function (err, locker) {
    if (err) { return handleError(res, err); }
    if(!locker) { return res.send(404); }
    var updated = _.merge(locker, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, locker);
    });
  });
};

// Deletes a locker from the DB.
exports.destroy = function(req, res) {
  Locker.findById(req.params.id, function (err, locker) {
    if(err) { return handleError(res, err); }
    if(!locker) { return res.send(404); }
    locker.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
