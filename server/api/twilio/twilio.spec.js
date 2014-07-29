'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');

describe('POST /api/twilio', function() {

  it('should respond with JSON array', function(done) {
    request(app)
      .post('/api/twilio/1/4802156208')
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.have.property('to', '+14802156208');
        done();
      });
  });
});

/* Sample response

{ sid: 'SMcd1f4b6c2ec846d78edc24d6b6ae8d35',
  date_created: 'Tue, 29 Jul 2014 06:40:05 +0000',
  date_updated: 'Tue, 29 Jul 2014 06:40:05 +0000',
  date_sent: null,
  account_sid: 'AC7d891dec4509075e51d50a7c7ac0a23a',
  to: '+14802156208',
  from: '+17637032985',
  body: 'GoldiLockers Claim Check for locker #1',
  status: 'queued',
  num_segments: '1',
  num_media: '0',
  direction: 'outbound-api',
  api_version: '2010-04-01',
  price: null,
  price_unit: 'USD',
  error_code: null,
  error_message: null,
  uri: '/2010-04-01/Accounts/AC7d891dec4509075e51d50a7c7ac0a23a/Messages/SMcd1f4b6c2ec846d78edc24d6b6ae8d35.json',
  subresource_uris: { media: '/2010-04-01/Accounts/AC7d891dec4509075e51d50a7c7ac0a23a/Messages/SMcd1f4b6c2ec846d78edc24d6b6ae8d35/Media.json' },
  dateCreated: Tue Jul 29 2014 00:40:05 GMT-0600 (MDT),
  dateUpdated: Tue Jul 29 2014 00:40:05 GMT-0600 (MDT),
  dateSent: null,
  accountSid: 'AC7d891dec4509075e51d50a7c7ac0a23a',
  numSegments: '1',
  numMedia: '0',
  apiVersion: '2010-04-01',
  priceUnit: 'USD',
  errorCode: null,
  errorMessage: null,
  subresourceUris: { media: '/2010-04-01/Accounts/AC7d891dec4509075e51d50a7c7ac0a23a/Messages/SMcd1f4b6c2ec846d78edc24d6b6ae8d35/Media.json' } }

 */
