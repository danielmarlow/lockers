'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');

describe('POST /api/twilio', function() {

  it('should respond with JSON array', function(done) {
    request(app)
      .post('/api/twilio/1/0000000000')
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.have.property('to', '+10000000000');
        done();
      });
  });
});

/* Sample response

{ sid: 'SMcd1f4b6c2ec846d78edc24d6b6ae8d35',
  date_created: 'Tue, 29 Jul 2014 06:40:05 +0000',
  date_updated: 'Tue, 29 Jul 2014 06:40:05 +0000',
  date_sent: null,
  account_sid: 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
  to: '+10000000000',
  from: '+10000000000',
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
  uri: '/2010-04-01/Accounts/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/Messages/SMcd1f4b6c2ec846d78edc24d6b6ae8d35.json',
  subresource_uris: { media: '/2010-04-01/Accounts/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/Messages/SMcd1f4b6c2ec846d78edc24d6b6ae8d35/Media.json' },
  dateCreated: Tue Jul 29 2014 00:40:05 GMT-0600 (MDT),
  dateUpdated: Tue Jul 29 2014 00:40:05 GMT-0600 (MDT),
  dateSent: null,
  accountSid: 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
  numSegments: '1',
  numMedia: '0',
  apiVersion: '2010-04-01',
  priceUnit: 'USD',
  errorCode: null,
  errorMessage: null,
  subresourceUris: { media: '/2010-04-01/Accounts/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/Messages/SMcd1f4b6c2ec846d78edc24d6b6ae8d35/Media.json' } }

 */
