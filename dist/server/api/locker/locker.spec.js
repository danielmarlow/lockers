'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');

describe('GET /api/lockers', function() {

  it('should respond with JSON array', function(done) {
    request(app)
      .get('/api/lockers')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Array);
        done();
      });
  });
});

describe('POST /api/lockers/clear', function() {

  it('should respond with HTTP 204', function(done) {
    request(app)
      .post('/api/lockers/clear')
      .expect(204)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.empty;
        done();
      });
  });
});

describe('POST /api/lockers/setup', function() {

  it('should respond with HTTP 201, and an array of lockers', function(done) {
    request(app)
      .post('/api/lockers/setup')
      .expect(201)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Array);
        done();
      });
  });
});
