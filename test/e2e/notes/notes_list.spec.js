'use strict';

var //cp   = require('child_process'),
    h    = require('../../helpers/helpers'),
    //db   = h.getdb(),
    path = require('path');

describe('notes list', function(){
  // beforeEach(function(done){
  //   cp.execFile(__dirname + '/../../scripts/clean-db.sh', [db], {cwd:__dirname + '/../../scripts'}, function(err, stdout, stderr){
  //     login();
  //     done();
  //   });
  // });

  it('should get the notes page', function(){
    expect(element(by.css('div[ui-view] > h1')).getText()).toEqual('notes');
  });

  it('should create a note', function(){
    create('title', 'b', 'c,d,e');

    expect(element(by.model('note.title')).getAttribute('value')).toEqual('');
    expect(element(by.model('note.body')).getAttribute('value')).toEqual('');
    expect(element(by.model('note.tags')).getAttribute('value')).toEqual('');
  });

  it('should go to a note detail', function(){
    create('title', 'y', 'z1,z2,z3');

    element(by.repeater('note in notes').row(0)).element(by.css('td:nth-child(2) > a')).click();
    expect(element(by.css('div[ui-view] > h1')).getText()).toEqual('title');
  });
});

function create(title, body, tags){
  var image = path.resolve(__dirname, '../../fixtures/flag.png');

  element(by.model('note.title')).sendKeys(title);
  element(by.model('note.body')).sendKeys(body);
  element(by.model('note.tags')).sendKeys(tags);
  element(by.css('input[type=file]')).sendKeys(image);
  element(by.css('button[ng-click]')).click();
}

// function login(){
//   browser.get('/#/login');
//   element(by.model('user.username')).sendKeys('bob');
//   element(by.model('user.password')).sendKeys('1234');
//   element(by.css('button[ng-click]')).click();
//   browser.get('/#/notes');
// }
