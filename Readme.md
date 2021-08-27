#Start Frontend
cd src/main/webapp/epayclient
ng serve

#URL
curl -u user:password http://localhost:8082/api/categories

#SQL

drop table databasechangelog;
drop table databasechangeloglock;

drop table IMAGES;
drop table products;
drop table categories;
drop table user_roles;
drop table rolesauthorities;
drop table users;
drop table roles;
drop table authorities;
drop table shopping_cart;

drop sequence IMAGES_SEQ;
drop sequence categories_seq;
drop sequence products_seq;
drop sequence roles_seq;
drop sequence users_seq;
drop sequence user_roles_seq;
drop sequence authorities_seq;
drop sequence rolesauthorities_seq;
drop sequence shopping_cart_seq;