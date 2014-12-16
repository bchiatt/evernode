/* jshint expr:true */

'use strict';

var expect     = require('chai').expect,
    cp         = require('child_process'),
    h          = require('../helpers/helpers'),
    server     = require('../../server/index'),
    Lab        = require('lab'),
    lab        = exports.lab = Lab.script(),
    describe   = lab.describe,
    it         = lab.it,
    beforeEach = lab.beforeEach,
    db         = h.getdb();

describe('Notes', function(){
  var cookie;

  beforeEach(function(done){
    cp.execFile(__dirname + '/../scripts/clean-db.sh', [db], {cwd:__dirname + '/../scripts'}, function(err, stdout, stderr){
      var options = {
        method: 'post',
        url: '/login',
        payload: {
          username: 'bob',
          password: '1234'
        }
      };

      server.inject(options, function(response){
        cookie = response.headers['set-cookie'][0].match(/hapi-cookie=[^;]+/)[0];
        done();
      });
    });
  });

  describe('post /notes', function(){
    it('should create a new note', function(done){
      var options = {
        method: 'post',
        url: '/notes',
        payload: {
          title: 'TITLE',
          body: 'BODY',
          tags: 'a,b,c'
        },
        headers: {
          cookie: cookie
        }
      };

      server.inject(options, function(response){
        expect(response.statusCode).to.equal(200);
        done();
      });
    });
  });

  describe('get /notes', function(){
    it('should get user notes', function(done){
      var options = {
        method: 'get',
        url: '/notes',
        payload: {
        },
        headers: {
          cookie: cookie
        }
      };

      server.inject(options, function(response){
        expect(response.statusCode).to.equal(200);
        expect(response.result.notes.length).to.equal(2);
        done();
      });
    });
  });

  describe('post /notes/{noteId}/upload', function(){
    it('should upload an image', function(done){
      var options = {
        method: 'post',
        url: '/notes/1/upload',
        payload: {
          file: '0101'
        },
        headers: {
          'content-length': 4,
          'content-type': 'multipart/form-data;',
          cookie: cookie
        }
      };

      server.inject(options, function(response){
        //expect(response.statusCode).to.equal(200);
        done();
      });
    });
  });

  describe('post /notes/{noteId}/upload-mobile', function(){
    it('should upload a b64 string', function(done){
      var options = {
        method: 'post',
        url: '/notes/1/upload-mobile',
        payload: {
          b64: 'b64string'
        },
        headers: {
          cookie: cookie
        }
      };

      server.inject(options, function(response){
        expect(response.statusCode).to.equal(200);
        done();
      });
    });
  });

  describe('get /notes/{noteId}', function(){
    it('should', function(done){
      var options = {
        method: 'get',
        url: '/notes/1',
        payload: {
        },
        headers: {
          cookie: cookie
        }
      };

      server.inject(options, function(response){
        expect(response.statusCode).to.equal(200);
        expect(response.result.body).to.equal('BODY1');
        done();
      });
    });
  });

  describe('delete /notes/{noteId}', function(){
    it('should delete a note', function(done){
      var options = {
        method: 'delete',
        url: '/notes/1',
        payload: {
        },
        headers: {
          cookie: cookie
        }
      };

      server.inject(options, function(response){
        expect(response.statusCode).to.equal(200);
        expect(response.result.noteId).to.equal(1);
        done();
      });
    });
  });

  describe('get /notes/count', function(){
    it('should get the user notes count', function(done){
      var options = {
        method: 'get',
        url: '/notes/count',
        payload: {
        },
        headers: {
          cookie: cookie
        }
      };

      server.inject(options, function(response){
        expect(response.statusCode).to.equal(200);
        expect(response.result.count).to.equal('2');
        done();
      });
    });
  });
});
