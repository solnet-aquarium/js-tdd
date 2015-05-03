/**
 * Test imports
 */
var chai = require('chai');
var should = require('chai').should();

/**
 * First version - creating a mongodb simple API using callbacks
 */
var client = require('mongodb').MongoClient;

describe('mongodb api testing', function() {
  var url = 'mongodb://localhost:27017/digitalgateway';
  it('should have the client instantiated', function(){
    client.should.be.defined;
  });
});