insert into users (username,password,avatar,token) values ('a1','b','c','d');
insert into users (username,password,avatar,token) values ('a2','b','c','d');
insert into users (username,password,avatar,token) values ('a3','b','c','d');

delete from users;

insert into users (id,username,password,avatar,token) values (1,'bob','$2a$08$PYFL3xyotOVDI/aAoCMdIOUmzLQ6k6yn5b29Vwoq7Uzgj8ff7CsYi','a.png','tok');

insert into notes (user_id,title,body) values (1,'TITLE','BODY');
insert into notes (user_id,title,body) values (1,'TITLE','BODY');
insert into notes (user_id,title,body) values (1,'TITLE','BODY');

insert into tags (name) values ('a');
insert into tags (name) values ('b');
insert into tags (name) values ('c');

delete from notes_tags;
delete from tags;
delete from notes;

insert into tags (id,name) values (1,'a');
insert into tags (id,name) values (2,'b');
insert into tags (id,name) values (3,'c');

insert into notes (id,user_id,title,body) values (1,1,'TITLE','BODY');
insert into notes (id,user_id,title,body) values (2,1,'TITLE','BODY');

insert into notes_tags(note_id,tag_id) values (1,1);
insert into notes_tags(note_id,tag_id) values (1,2);
insert into notes_tags(note_id,tag_id) values (1,3);
insert into notes_tags(note_id,tag_id) values (2,3);
