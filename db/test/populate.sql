insert into users (username,password,avatar,token) values ('a1','b','c','d');
insert into users (username,password,avatar,token) values ('a2','b','c','d');
insert into users (username,password,avatar,token) values ('a3','b','c','d');

delete from users;

insert into users (id,username,password,avatar,token) values (1,'bob','$2a$08$PYFL3xyotOVDI/aAoCMdIOUmzLQ6k6yn5b29Vwoq7Uzgj8ff7CsYi','a.png','tok');

insert into notes (user_id,title,body,tags) values (1,'TITLE','BODY','a,b,c');
insert into notes (user_id,title,body,tags) values (1,'TITLE','BODY','a,b,c');
insert into notes (user_id,title,body,tags) values (1,'TITLE','BODY','a,b,c');

delete from notes;

insert into notes (id,user_id,title,body,tags) values (1,1,'TITLE','BODY','a,b,c');
insert into notes (id,user_id,title,body,tags) values (2,1,'TITLE','BODY','c');
