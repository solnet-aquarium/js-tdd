/**
 * Test imports
 */
var chai = require('chai');
var should = require('chai').should(),
    expect = require('chai').expect;

/**
 * First version - creating a mongodb simple API using callbacks
 */
var client = require('mongodb').MongoClient;

describe('mongodb api testing', function () {
  var url = 'mongodb://localhost:27017/jstdd',
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
  describe('inserting a document', function () {
    beforeEach(function (done) {
      client.connect(url, function (err, db) {
        db.should.be.defined;
        db.collection('users').deleteMany({}, function (err, result) {
          expect(err).to.be.null;
          expect(result).to.be.ok;
          done();
        });
      });
    });
    afterEach(function (done) {
      client.connect(url, function (err, db) {
        db.should.be.defined;
        db.collection('users').deleteMany({}, function (err, result) {
          expect(err).to.be.null;
          expect(result).to.be.ok;
          done();
        });
      });
    });
    it('should insert a document to mongodb', function (done) {
      client.connect(url, function (err, db) {
        db.collection('users').insertOne({username: 'admin', password: 'admin'}, function (err, result) {
          expect(err).to.be.null;
          result.should.be.ok;
          done();
        });
      });
    });
  });
  describe('retrieving a document from mongodb', function () {
    beforeEach(function (done) {
      client.connect(url, function (err, db) {
        db.should.be.defined;
        db.collection('users').deleteMany({}, function (err, result) {
          expect(err).to.be.null;
          expect(result).to.be.ok;
          db.collection('users').insertMany([
            {username: 'admin', password: 'admin'},
            {username: 'admin2', password: 'admin2'},
            {username: 'user3', password: 'user3'}
          ], function (err, resultInsertMany) {
            expect(err).to.be.null;
            resultInsertMany.should.be.ok;
            done();
          });
        });
      });
    });
    afterEach(function (done) {
      client.connect(url, function (err, db) {
        db.should.be.defined;
        db.collection('users').deleteMany({}, function (err, result) {
          expect(err).to.be.null;
          expect(result).to.be.ok;
          done();
        });
      });
    });
    it('should retrieve one document from mongodb', function (done) {
      client.connect(url, function (err, db) {
        db.collection('users').findOne({username: 'admin'}, function (err, result) {
          result.should.be.ok;
          result.should.have.property('username').equals('admin');
          result.should.have.property('password').equals('admin');
          result.should.have.property('_id');
          done();
        });
      });
    });
  });
  describe('retrieving a list of documents from mongodb', function () {
    beforeEach(function (done) {
      client.connect(url, function (err, db) {
        db.should.be.defined;
        db.collection('users').deleteMany({}, function (err, result) {
          expect(err).to.be.null;
          expect(result).to.be.ok;
          db.collection('users').insertMany([
            {username: 'admin', password: 'admin'},
            {username: 'admin2', password: 'admin2'},
            {username: 'user', password: 'user'},
            {username: 'user2', password: 'user2'},
            {username: 'user3', password: 'user3'}
          ], function (err, resultInsertMany) {
            expect(err).to.be.null;
            resultInsertMany.should.be.ok;
            done();
          });
        });
      });
    });
    afterEach(function (done) {
      client.connect(url, function (err, db) {
        db.should.be.defined;
        db.collection('users').deleteMany({}, function (err, result) {
          expect(err).to.be.null;
          expect(result).to.be.ok;
          done();
        });
      });
    });
    it('should retrieve a list of documents from mongodb', function (done) {
      client.connect(url, function (err, db) {
        db.collection('users').find({username: {$regex: '^user*'}})
            .toArray(function (err, resultFind) {
              expect(err).to.be.null;
              resultFind.should.have.property('length').to.equals(3);
              resultFind[0].should.have.property('username').to.equals('user');
              resultFind[0].should.have.property('password').to.equals('user');
              resultFind[1].should.have.property('username').to.equals('user2');
              resultFind[1].should.have.property('password').to.equals('user2');
              resultFind[2].should.have.property('username').to.equals('user3');
              resultFind[2].should.have.property('password').to.equals('user3');
              done();
            });
      });
    });
  });
  describe('removing a list of users from mongodb', function(){
    beforeEach(function (done) {
      client.connect(url, function (err, db) {
        db.should.be.defined;
        db.collection('users').deleteMany({}, function (err, result) {
          expect(err).to.be.null;
          expect(result).to.be.ok;
          db.collection('users').insertMany([
            {username: 'admin', password: 'admin'},
            {username: 'admin2', password: 'admin2'},
            {username: 'user', password: 'user'},
            {username: 'user2', password: 'user2'},
            {username: 'user3', password: 'user3'}
          ], function (err, resultInsertMany) {
            expect(err).to.be.null;
            resultInsertMany.should.be.ok;
            done();
          });
        });
      });
    });
    afterEach(function (done) {
      client.connect(url, function (err, db) {
        db.should.be.defined;
        db.collection('users').deleteMany({}, function (err, result) {
          expect(err).to.be.null;
          expect(result).to.be.ok;
          done();
        });
      });
    });
    it('should remove all admin users from mongodb', function (done) {
      client.connect(url, function (err, db) {
        db.collection('users').deleteMany({username: 'admin'}, function (err, result) {
          expect(err).to.be.null;
          result.should.be.ok;
          db.collection('users').findOne({username: 'admin'}, function (err, result) {
            expect(err).to.be.null;
            expect(result).to.be.null;
            done();
          });
        });
      });
    });
  });
});