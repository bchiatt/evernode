/* jshint expr:true */

'use strict';

var expect     = require('chai').expect,
    cp         = require('child_process'),
    fs         = require('fs'),
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
        expect(err).to.be.null;
        expect(notes.length).to.be.above(1);
        done();
      });
    });
    it('should find 2 notes from a user', function(done){
      Note.query({id:1}, {limit:2,offest:0,tag:'%'}, function(err, notes){
        expect(err).to.be.null;
        expect(notes.length).to.be.equal(2);
        done();
      });
    });
  });

  describe('.show', function(){
    it('should find a note from a user', function(done){
      Note.show({id:1}, 1, function(err, note){
        expect(err).to.be.null;
        expect(note.tags.length).to.be.equal(3);
        done();
      });
    });
  });

  describe('.count', function(){
    it('should return a user\'s total note count', function(done){
      Note.count({id:1}, function(err, count){
        expect(err).to.be.null;
        expect(count).to.be.equal('2');
        done();
      });
    });
  });

  describe('.nuke', function(){
    it('should delete a note', function(done){
      Note.nuke({id:1}, '1', function(err, noteId){
        expect(err).to.be.null;
        expect(noteId).to.be.equal(1);
        done();
      });
    });
  });

  describe('.upload', function(){
    it('should upload an image', function(done){
      var file = fs.createReadStream(__dirname + '/../fixtures/flag.png');
      Note.upload({token:'tok'}, file, 'flag.png', 1, function(err, result){
        expect(err).to.be.null;
        expect(result.ETag).to.be.ok;
        done();
      });
    });
  });

  describe('.uploadmobile', function(){
    it('should upload a b64 encoded image', function(done){
      Note.uploadmobile({token:'tok'}, 'b64image', 1, function(err, result){
        expect(err).to.be.null;
        expect(result.ETag).to.be.ok;
        done();
      });
    });
  });
});
