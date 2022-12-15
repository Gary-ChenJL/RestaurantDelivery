-- CS4400: Introduction to Database Systems (Fall 2022)
-- Project Phase II: Database Schema SOLUTION [v2] Wednesday, November 30, 2022
set global transaction isolation level serializable;
set global SQL_MODE = 'ANSI,TRADITIONAL';
set names utf8mb4;
set SQL_SAFE_UPDATES = 0;

drop database if exists restaurant_supply_express;
create database if not exists restaurant_supply_express;
use restaurant_supply_express;
-- -----------------------------------------------
-- table structures
-- -----------------------------------------------

create table users (
username varchar(40) not null,
first_name varchar(100) not null,
last_name varchar(100) not null,
address varchar(500) not null,
birthdate date not null,
primary key (username)
) engine = innodb;

create table employees (
username varchar(40) not null,
taxID varchar(40) not null,
hired date not null,
experience integer not null,
salary integer not null,
primary key (username),
unique key (taxID)
) engine = innodb;

create table restaurant_owners (
username varchar(40) not null,
primary key (username)
) engine = innodb;

create table pilots (
username varchar(40) not null,
licenseID varchar(40) not null,
experience integer not null,
primary key (username),
unique key (licenseID)
) engine = innodb;

create table workers (
username varchar(40) not null,
primary key (username)
) engine = innodb;

create table ingredients (
barcode varchar(40) not null,
iname varchar(100) not null,
weight integer not null,
primary key (barcode)
) engine = innodb;

create table locations (
label varchar(40) not null,
x_coord integer not null,
y_coord integer not null,
space integer not null,
primary key (label)
) engine = innodb;

create table restaurants (
long_name varchar(40) not null,
rating integer not null,
spent integer not null,
location varchar(40) not null,
funded_by varchar(40) default null,
primary key (long_name)
) engine = innodb;

create table delivery_services (
id varchar(40) not null,
long_name varchar(100) not null,
home_base varchar(40) not null,
manager varchar(40) not null,
primary key (id),
unique key (manager)
) engine = innodb;

create table drones (
id varchar(40) not null,
tag integer not null,
fuel integer not null,
capacity integer not null,
sales integer not null,
flown_by varchar(40) default null,
swarm_id varchar(40) default null,
swarm_tag integer default null,
hover varchar(40) not null,
primary key (id, tag)
) engine = innodb;

create table payload (
id varchar(40) not null,
tag integer not null,
barcode varchar(40) not null,
quantity integer not null,
price integer not null,
primary key (id, tag, barcode)
) engine = innodb;

create table work_for (
username varchar(40) not null,
id varchar(40) not null,
primary key (username, id)
) engine = innodb;

-- -----------------------------------------------
-- referential structures
-- -----------------------------------------------

alter table employees add constraint fk1 foreign key (username) references users (username)
	on update cascade on delete cascade;
alter table restaurant_owners add constraint fk2 foreign key (username)
	references users (username) on update cascade on delete cascade;
alter table pilots add constraint fk3 foreign key (username) references employees (username)
	on update cascade on delete cascade;
alter table workers add constraint fk4 foreign key (username) references employees (username)
	on update cascade on delete cascade;
alter table restaurants add constraint fk10 foreign key (location) references locations (label)
	on update cascade;
alter table restaurants add constraint fk12 foreign key (funded_by)
	references restaurant_owners (username);
alter table delivery_services add constraint fk11 foreign key (home_base)
	references locations (label) on update cascade;
alter table delivery_services add constraint fk15 foreign key (manager)
	references workers (username);
alter table drones add constraint fk5 foreign key (id) references delivery_services (id);
alter table drones add constraint fk13 foreign key (flown_by) references pilots (username);
alter table drones add constraint fk14 foreign key (swarm_id, swarm_tag)
	references drones (id, tag) on update cascade on delete cascade;
alter table drones add constraint fk16 foreign key (hover) references locations (label)
	on update cascade;
alter table payload add constraint fk6 foreign key (id, tag) references drones (id, tag);
alter table payload add constraint fk7 foreign key (barcode) references ingredients (barcode);
alter table work_for add constraint fk8 foreign key (username) references employees (username);
alter table work_for add constraint fk9 foreign key (id) references delivery_services (id);

-- -----------------------------------------------
-- table data
-- -----------------------------------------------

insert into users values
('jstone5', 'Jared', 'Stone', '101 Five Finger Way', '1961-01-06'),
('sprince6', 'Sarah', 'Prince', '22 Peachtree Street', '1968-06-15'),
('awilson5', 'Aaron', 'Wilson', '220 Peachtree Street', '1963-11-11'),
('lrodriguez5', 'Lina', 'Rodriguez', '360 Corkscrew Circle', '1975-04-02'),
('tmccall5', 'Trey', 'McCall', '360 Corkscrew Circle', '1973-03-19'),
('eross10', 'Erica', 'Ross', '22 Peachtree Street', '1975-04-02'),
('hstark16', 'Harmon', 'Stark', '53 Tanker Top Lane', '1971-10-27'),
('echarles19', 'Ella', 'Charles', '22 Peachtree Street', '1974-05-06'),
('csoares8', 'Claire', 'Soares', '706 Living Stone Way', '1965-09-03'),
('agarcia7', 'Alejandro', 'Garcia', '710 Living Water Drive', '1966-10-29'),
('bsummers4', 'Brie', 'Summers', '5105 Dragon Star Circle', '1976-02-09'),
('cjordan5', 'Clark', 'Jordan', '77 Infinite Stars Road', '1966-06-05'),
('fprefontaine6', 'Ford', 'Prefontaine', '10 Hitch Hikers Lane', '1961-01-28'),
('mrobot1', 'Mister', 'Robot', '10 Autonomy Trace', '1988-11-02'),
('mrobot2', 'Mister', 'Robot', '10 Clone Me Circle', '1988-11-02'),
('ckann5', 'Carrot', 'Kann', '64 Knights Square Trail', '1972-09-01'),
('rlopez6', 'Radish', 'Lopez', '8 Queens Route', '1999-09-03');

insert into employees values
('awilson5', '111-11-1111', '2020-03-15', 9, 46000),
('lrodriguez5', '222-22-2222', '2019-04-15', 20, 58000),
('tmccall5', '333-33-3333', '2018-10-17', 29, 33000),
('eross10', '444-44-4444', '2020-04-17', 10, 61000),
('hstark16', '555-55-5555', '2018-07-23', 20, 59000),
('echarles19', '777-77-7777', '2021-01-02', 3, 27000),
('csoares8', '888-88-8888', '2019-02-25', 26, 57000),
('agarcia7', '999-99-9999', '2019-03-17', 24, 41000),
('bsummers4', '000-00-0000', '2018-12-06', 17, 35000),
('fprefontaine6', '121-21-2121', '2020-04-19', 5, 20000),
('mrobot1', '101-01-0101', '2015-05-27', 8, 38000),
('mrobot2', '010-10-1010', '2015-05-27', 8, 38000),
('ckann5', '640-81-2357', '2019-08-03', 27, 46000),
('rlopez6', '123-58-1321', '2017-02-05', 51, 64000);

insert into restaurant_owners values
('jstone5'), ('sprince6'), ('cjordan5');

insert into pilots values
('awilson5', '314159', 41), ('lrodriguez5', '287182', 67),
('tmccall5', '181633', 10), ('agarcia7', '610623', 38),
('bsummers4', '411911', 35), ('fprefontaine6', '657483', 2),
('echarles19', '236001', 10), ('csoares8', '343563', 7),
('mrobot1', '101010', 18), ('rlopez6', '235711', 58);

insert into workers values
('tmccall5'), ('eross10'), ('hstark16'), ('echarles19'),
('csoares8'), ('mrobot2'), ('ckann5');

insert into ingredients values
('pr_3C6A9R', 'prosciutto', 6), ('ss_2D4E6L', 'saffron', 3),
('hs_5E7L23M', 'truffles', 3), ('clc_4T9U25X', 'caviar', 5),
('ap_9T25E36L', 'foie gras', 4), ('bv_4U5L7M', 'balsamic vinegar', 4);

insert into locations values
('plaza', 5, 12, 20), ('midtown', 1, 4, 3), ('highpoint', 7, 0, 2),
('southside', 3, -6, 3), ('mercedes', 1, 1, 2), ('avalon', 2, 16, 5),
('airport', -2, -9, 4), ('buckhead', 3, 8, 4);

insert into restaurants values
('Lure', 5, 20, 'midtown', 'jstone5'), ('Ecco', 3, 0, 'buckhead', 'jstone5'),
('South City Kitchen', 5, 30, 'midtown', 'jstone5'), ('Tre Vele', 4, 10, 'plaza', null),
('Fogo de Chao', 4, 30, 'buckhead', null), ('Hearth', 4, 0, 'avalon', null),
('Il Giallo', 4, 10, 'mercedes', 'sprince6'), ('Bishoku', 5, 10, 'plaza', null),
('Casi Cielo', 5, 30, 'plaza', null), ('Micks', 2, 0, 'southside', null);

insert into delivery_services values
('osf', 'On Safari Foods', 'southside', 'eross10'),
('hf', 'Herban Feast', 'southside', 'hstark16'),
('rr', 'Ravishing Radish', 'avalon', 'echarles19');

insert into drones values
('osf', 1, 100, 9, 0, 'awilson5', null, null, 'airport'),
('hf', 1, 100, 6, 0, 'fprefontaine6', null, null, 'southside'),
('hf', 5, 27, 7, 100, 'fprefontaine6', null, null, 'buckhead'),
('hf', 8, 100, 8, 0, 'bsummers4', null, null, 'southside'),
('hf', 16, 17, 5, 40, 'fprefontaine6', null, null, 'buckhead'),
('rr', 3, 100, 5, 50, 'agarcia7', null, null, 'avalon'),
('rr', 7, 53, 5, 100, 'agarcia7', null, null, 'avalon'),
('rr', 8, 100, 6, 0, 'agarcia7', null, null, 'highpoint');

insert into drones values
('osf', 2, 75, 7, 0, null, 'osf', 1, 'airport'),
('hf', 11, 25, 10, 0, null, 'hf', 5, 'buckhead'),
('rr', 11, 90, 6, 0, null, 'rr', 8, 'highpoint');

insert into payload values
('osf', 1, 'pr_3C6A9R', 5, 20),
('osf', 1, 'ss_2D4E6L', 3, 23),
('osf', 2, 'hs_5E7L23M', 7, 14),
('hf', 1, 'ss_2D4E6L', 6, 27),
('hf', 5, 'hs_5E7L23M', 4, 17),
('hf', 5, 'clc_4T9U25X', 1, 30),
('hf', 8, 'pr_3C6A9R', 4, 18),
('hf', 11, 'ss_2D4E6L', 3, 19),
('rr', 3, 'hs_5E7L23M', 2, 15),
('rr', 3, 'clc_4T9U25X', 2, 28);

insert into work_for values
('eross10', 'osf'), ('hstark16', 'hf'), ('echarles19', 'rr'),
('tmccall5', 'hf'), ('awilson5', 'osf'), ('fprefontaine6', 'hf'),
('bsummers4', 'hf'), ('agarcia7', 'rr'), ('mrobot1', 'osf'),
('mrobot1', 'rr'), ('ckann5', 'osf'), ('rlopez6', 'rr');
