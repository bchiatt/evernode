/* jshint expr:true */

'use strict';

var expect     = require('chai').expect,
    cp         = require('child_process'),
    h          = require('../helpers/helpers'),
    Note       = require('../../server/models/note'),
    Lab        = require('lab'),
    lab        = exports.lab = Lab.script(),
    describe   = lab.describe,
    it         = lab.it,
    beforeEach = lab.beforeEach,
    db         = h.getdb();

describe('User', function(){
  beforeEach(function(done){
    cp.execFile(__dirname + '/../scripts/clean-db.sh', [db], {cwd:__dirname + '/../scripts'}, function(err, stdout, stderr){
      done();
    });
  });

  describe('constructor', function(){
    it('should create a note object', function(done){
      var note = new Note();

      expect(note).to.be.instanceof(Note);
      done();
    });
  });
  describe('.create', function(){
    it('should create a new note', function(done){
      Note.create({id:1}, {title:'TITLE', body:'BODY', tags:'a,b,c'}, function(err, note){
        expect(err).to.be.null;
        expect(note).to.be.ok;
        done();
      });
    });
  });
  describe('.query', function(){
    it('should find all notes from a user', function(done){
      Note.query({id:1}, {}, function(err, notes){
        console.log('error', err);
        console.log('notes', notes);
        done();
      });
    });
  });
  describe('.show', function(){
    it('should find a note from a user', function(done){
      done();
    });
  });
  describe('.count', function(){
    it('should return a user\'s total note count', function(done){
      done();
    });
  });
  describe('.nuke', function(){
    it('should delete a note', function(done){
      done();
    });
  });
});
