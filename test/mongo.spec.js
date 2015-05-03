/**
 * Test imports
 */
var chai = require('chai');
var should = require('chai').should();

/**
 * First version - creating a mongodb simple API using callbacks
 */
var client = require('mongodb').MongoClient;

describe('mongodb api testing', function () {
  var url = 'mongodb://localhost:27017/digitalgateway',
      connect;
  beforeEach(function (done) {
    connect = client.connect(url, function (err, db) {
      db.should.be.defined;
      db.close();
      done();
    });
  });
  it('should have the client instantiated', function () {
    client.should.be.defined;
  });
});