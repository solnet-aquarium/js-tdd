/**
 * Test imports
 */
var chai = require('chai');
var should = require('chai').should();
var expect = require('chai').expect; //change0

/**
 * First version - creating a mongodb simple API using callbacks
 */
describe('mongodb api testing', function() {
  var client = require('mongodb').MongoClient,
      url = 'mongodb://localhost:27017/jdtdd',
      connect; // change1
  beforeEach(function(done){ // #exp1
    connect = client.connect(url, function(err, db) {
      db.should.be.defined; //#exp2
      expect(err).to.be.null; //#exp3
      db.close();
      done(); // #exp1
    });
  }); // change2
  it('should have the client instantiated', function(){
    client.should.be.defined;
  });
  it('should insert a document to mongodb', function(done){

  });
});