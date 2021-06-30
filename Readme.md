Sql de rulat inainte pe local

create table categories(
id int primary key,
category_name NVARCHAR2(100)
);


CREATE SEQUENCE categories_seq
START WITH     1
INCREMENT BY   1
NOCACHE
NOCYCLE;

insert into categories values(categories_seq.nextVal, 'mere');
insert into categories values(categories_seq.nextVal, 'pere');
insert into categories values(categories_seq.nextVal, 'banane');
insert into categories values(categories_seq.nextVal, 'portocale');

URL : http://localhost:8082/api/*