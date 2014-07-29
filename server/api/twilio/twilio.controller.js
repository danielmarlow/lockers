'use strict';

var _ = require('lodash');
// Twilio Credentials
var accountSid = 'AC7d891dec4509075e51d50a7c7ac0a23a';
var authToken = process.env.TWILIO_SECRET;
//require the Twilio module and create a REST client
var client = require('twilio')(accountSid, authToken);

// Send a message
exports.send = function(req, res) {

  console.log(req.params);
  var locker = req.params.locker;
  var number = req.params.number;

  client.messages.create({
    to: number,
  	from: "+17637032985",
  	body: "GoldiLockers Claim Check for locker #" + locker,
  }, function(err, message) {
    if(err) { return handleError(res, err); }
  return res.send(200, message);
  });
}

// // Get list of twilios
// exports.index = function(req, res) {
//   Twilio.find(function (err, twilios) {
//     if(err) { return handleError(res, err); }
//     return res.json(200, twilios);
//   });
// };
//
// // Get a single twilio
// exports.show = function(req, res) {
//   Twilio.findById(req.params.id, function (err, twilio) {
//     if(err) { return handleError(res, err); }
//     if(!twilio) { return res.send(404); }
//     return res.json(twilio);
//   });
// };
//
// // Creates a new twilio in the DB.
// exports.create = function(req, res) {
//   Twilio.create(req.body, function(err, twilio) {
//     if(err) { return handleError(res, err); }
//     return res.json(201, twilio);
//   });
// };
//
// // Updates an existing twilio in the DB.
// exports.update = function(req, res) {
//   if(req.body._id) { delete req.body._id; }
//   Twilio.findById(req.params.id, function (err, twilio) {
//     if (err) { return handleError(res, err); }
//     if(!twilio) { return res.send(404); }
//     var updated = _.merge(twilio, req.body);
//     updated.save(function (err) {
//       if (err) { return handleError(res, err); }
//       return res.json(200, twilio);
//     });
//   });
// };
//
// // Deletes a twilio from the DB.
// exports.destroy = function(req, res) {
//   Twilio.findById(req.params.id, function (err, twilio) {
//     if(err) { return handleError(res, err); }
//     if(!twilio) { return res.send(404); }
//     twilio.remove(function(err) {
//       if(err) { return handleError(res, err); }
//       return res.send(204);
//     });
//   });
// };

function handleError(res, err) {
  return res.send(500, err);
}
