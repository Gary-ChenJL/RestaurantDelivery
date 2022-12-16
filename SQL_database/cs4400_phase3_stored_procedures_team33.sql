-- CS4400: Introduction to Database Systems (Fall 2022)
-- Project Phase III: Stored Procedures SHELL [v0] Monday, Oct 31, 2022
set global transaction isolation level serializable;
set global SQL_MODE = 'ANSI,TRADITIONAL';
set names utf8mb4;
set SQL_SAFE_UPDATES = 0;

use restaurant_supply_express;
-- -----------------------------------------------------------------------------
-- stored procedures and views
-- -----------------------------------------------------------------------------
/* Standard Procedure: If one or more of the necessary conditions for a procedure to
be executed is false, then simply have the procedure halt execution without changing
the database state. Do NOT display any error messages, etc. */

-- [1] add_owner()
-- -----------------------------------------------------------------------------
/* This stored procedure creates a new owner.  A new owner must have a unique
username.  Also, the new owner is not allowed to be an employee. */
-- -----------------------------------------------------------------------------
drop procedure if exists add_owner;
delimiter //
create procedure add_owner (in ip_username varchar(40), in ip_first_name varchar(100),
	in ip_last_name varchar(100), in ip_address varchar(500), in ip_birthdate date)
sp_main: begin
	if (select count(*) from users where username = ip_username)>=1 
    or exists(select * from employees where username = ip_username)
    or ip_username is null or ip_first_name is null or ip_last_name is null or ip_address is null or ip_birthdate is null 
    or ip_birthdate is null
    then 
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Call failed, inputs failed to satisfy procedure requirements';
    leave sp_main; end if;
	insert into users values (ip_username, ip_first_name, ip_last_name, ip_address, ip_birthdate);
    insert into restaurant_owners values (ip_username);
    -- alter table employees add constraint check_owner check (username <> ip_username);
    -- ensure new owner has a unique username
end //
delimiter ;

-- [2] add_employee()
-- -----------------------------------------------------------------------------
/* This stored procedure creates a new employee without any designated pilot or
worker roles.  A new employee must have a unique username unique tax identifier. */
-- -----------------------------------------------------------------------------
drop procedure if exists add_employee;
delimiter //
create procedure add_employee (in ip_username varchar(40), in ip_first_name varchar(100),
	in ip_last_name varchar(100), in ip_address varchar(500), in ip_birthdate date,
    in ip_taxID varchar(40), in ip_hired date, in ip_employee_experience integer,
    in ip_salary integer)
sp_main: begin
	if (exists(select * from restaurant_owners where username = ip_username))
    or (select count(*) from employees where username = ip_username)>=1 
    or (select count(*) from employees where taxID = ip_taxID)>=1 
    or ip_username is null or ip_first_name is null or ip_last_name or ip_address is null 
    or ip_birthdate is null or ip_taxID is null or ip_hired is null or ip_employee_experience is null or ip_salary is null
    then 
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Add_employee failed, inputs failed to satisfy procedure requirements';
    leave sp_main; end if;
    insert into users values (ip_username, ip_first_name, ip_last_name, ip_address, ip_birthdate);
	insert into employees values (ip_username, ip_taxID, ip_hired, ip_employee_experience, ip_salary);
    -- ensure new owner has a unique username
    -- ensure new employee has a unique tax identifier
end //
delimiter ;

-- [3] add_pilot_role()
-- -----------------------------------------------------------------------------
/* This stored procedure adds the pilot role to an existing employee.  The
employee/new pilot must have a unique license identifier. */
-- -----------------------------------------------------------------------------
drop procedure if exists add_pilot_role;
delimiter //
create procedure add_pilot_role (in ip_username varchar(40), in ip_licenseID varchar(40),
	in ip_pilot_experience integer)
sp_main: begin
	if (select count(*) from employees where username = ip_username)=0 
    or (select count(*) from pilots where licenseID = ip_licenseID)>=1 
    then 
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Call failed, inputs failed to satisfy procedure requirements';
    leave sp_main; end if;
	insert into pilots values (ip_username, ip_licenseID, ip_pilot_experience);
    -- ensure new employee exists
    -- ensure new pilot has a unique license identifier
end //
delimiter ;

-- [4] add_worker_role()
-- -----------------------------------------------------------------------------
/* This stored procedure adds the worker role to an existing employee. */
-- -----------------------------------------------------------------------------
drop procedure if exists add_worker_role;
delimiter //
create procedure add_worker_role (in ip_username varchar(40))
sp_main: begin
	if (select count(*) from employees where username = ip_username)=0 
    then 
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Call failed, inputs failed to satisfy procedure requirements';
    leave sp_main; end if;
	insert into workers values (ip_username);
    -- ensure new employee exists
end //
delimiter ;

-- [5] add_ingredient()
-- -----------------------------------------------------------------------------
/* This stored procedure creates a new ingredient.  A new ingredient must have a
unique barcode. */
-- -----------------------------------------------------------------------------
drop procedure if exists add_ingredient;
delimiter //
create procedure add_ingredient (in ip_barcode varchar(40), in ip_iname varchar(100),
	in ip_weight integer)
sp_main: begin
	if (select count(*) from ingredients where barcode = ip_barcode)>=1 
    then SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Call failed, inputs failed to satisfy procedure requirements';
    leave sp_main; end if;
	insert into ingredients values (ip_barcode, ip_iname, ip_weight);
	-- ensure new ingredient doesn't already exist
end //
delimiter ;

-- [6] add_drone()
-- -----------------------------------------------------------------------------
/* This stored procedure creates a new drone.  A new drone must be assigned 
to a valid delivery service and must have a unique tag.  Also, it must be flown
by a valid pilot initially (i.e., pilot works for the same service), but the pilot
can switch the drone to working as part of a swarm later. And the drone's starting
location will always be the delivery service's home base by default. */
-- -----------------------------------------------------------------------------
drop procedure if exists add_drone;
delimiter //
create procedure add_drone (in ip_id varchar(40), in ip_tag integer, in ip_fuel integer,
	in ip_capacity integer, in ip_sales integer, in ip_flown_by varchar(40))
sp_main: begin
	if (select count(*) from drones where id = ip_id and tag=ip_tag)>=1 
    or (select count(*) from delivery_services where id = ip_id)=0 
    or (select count(*) from pilots where username = ip_flown_by)=0 
    or (select id from works_for where username = ip_flown_by) <> ip_id
    then 
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Call failed, inputs failed to satisfy procedure requirements';
    leave sp_main; end if;
	insert into drones values (ip_id, ip_tag, ip_fuel, ip_capacity, ip_sales, ip_flown_by, null, null, 
		(select home_base from delivery_services where id = ip_id));
	-- ensure new drone doesn't already exist
    -- ensure that the delivery service exists
    -- ensure that a valid pilot will control the drone
end //
delimiter ;

-- [7] add_restaurant()
-- -----------------------------------------------------------------------------
/* This stored procedure creates a new restaurant.  A new restaurant must have a
unique (long) name and must exist at a valid location, and have a valid rating.
And a resturant is initially "independent" (i.e., no owner), but will be assigned
an owner later for funding purposes. */
-- -----------------------------------------------------------------------------
drop procedure if exists add_restaurant;
delimiter //
create procedure add_restaurant (in ip_long_name varchar(40), in ip_rating integer,
	in ip_spent integer, in ip_location varchar(40))
sp_main: begin
	if (select count(*) from restaurants where long_name = ip_long_name)>=1 
    or (select count(*) from locations where label = ip_location)=0 
    or ip_rating not between 1 and 5 
    then 
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Call failed, inputs failed to satisfy procedure requirements';
    leave sp_main; end if;
	insert into restaurants values (ip_long_name, ip_rating, ip_spent, ip_location, null);
	-- ensure new restaurant doesn't already exist
    -- ensure that the location is valid
    -- ensure that the rating is valid (i.e., between 1 and 5 inclusively)
end //
delimiter ;

-- [8] add_service()
-- -----------------------------------------------------------------------------
/* This stored procedure creates a new delivery service.  A new service must have
a unique identifier, along with a valid home base and manager. */
-- -----------------------------------------------------------------------------
drop procedure if exists add_service;
delimiter //
create procedure add_service (in ip_id varchar(40), in ip_long_name varchar(100),
	in ip_home_base varchar(40), in ip_manager varchar(40))
sp_main: begin
	if (select count(*) from delivery_services where id = ip_id)>=1 
    or (select count(*) from locations where label = ip_home_base)=0 
    or (select count(*) from workers where username = ip_manager)=0 
    then 
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Call failed, inputs failed to satisfy procedure requirements';
    leave sp_main; end if;
	insert into delivery_services values (ip_id, ip_long_name, ip_home_base, ip_manager);
	-- ensure new delivery service doesn't already exist
    -- ensure that the home base location is valid
    -- ensure that the manager is valid
end //
delimiter ;

-- [9] add_location()
-- -----------------------------------------------------------------------------
/* This stored procedure creates a new location that becomes a new valid drone
destination.  A new location must have a unique combination of coordinates.  We
could allow for "aliased locations", but this might cause more confusion that
it's worth for our relatively simple system. */
-- -----------------------------------------------------------------------------
drop procedure if exists add_location;
delimiter //
create procedure add_location (in ip_label varchar(40), in ip_x_coord integer,
	in ip_y_coord integer, in ip_space integer)
sp_main: begin
	-- ensure new location doesn't already exist
    -- ensure that the coordinate combination is distinct
	if (select count(*) from locations where label = ip_label) >= 1
    or (select count(*) from locations where (x_coord = ip_x_coord and y_coord = ip_y_coord))>=1 
	then 
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Call failed, inputs failed to satisfy procedure requirements';
    leave sp_main; end if;
    
	insert into locations values (ip_label, ip_x_coord, ip_y_coord, ip_space);
end //
delimiter ;

-- [10] start_funding()
-- -----------------------------------------------------------------------------
/* This stored procedure opens a channel for a restaurant owner to provide funds
to a restaurant. If a different owner is already providing funds, then the current
owner is replaced with the new owner.  The owner and restaurant must be valid. */
-- -----------------------------------------------------------------------------
drop procedure if exists start_funding;
delimiter //
create procedure start_funding (in ip_owner varchar(40), in ip_long_name varchar(40))
sp_main: begin
	-- ensure the owner and restaurant are valid
	if (select count(*) from restaurant_owners where username = ip_owner) = 0
    or (select count(*) from restaurants where long_name = ip_long_name) = 0 
	then 
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Call failed, inputs failed to satisfy procedure requirements';
    leave sp_main; end if;
	update restaurants set funded_by = ip_owner where long_name = ip_long_name;
end //
delimiter ;

-- [11] hire_employee()
-- -----------------------------------------------------------------------------
/* This stored procedure hires an employee to work for a delivery service.
Employees can be combinations of workers and pilots. If an employee is actively
controlling drones or serving as manager for a different service, then they are
not eligible to be hired.  Otherwise, the hiring is permitted. */
-- -----------------------------------------------------------------------------
drop procedure if exists hire_employee;
delimiter //
create procedure hire_employee (in ip_username varchar(40), in ip_id varchar(40))
sp_main: begin
	-- ensure that the employee hasn't already been hired
	-- ensure that the employee and delivery service are valid
    -- ensure that the employee isn't a manager for another service
	-- ensure that the employee isn't actively controlling drones for another service
	if (select count(*) from work_for where username = ip_username and id = ip_id) >= 1
    or (select count(*) from employees where username = ip_username) = 0
	or (select count(*) from delivery_services where id = ip_id) = 0
	or (select count(*) from delivery_services where manager = ip_username) >= 1
	or (select count(*) from drones where flown_by = ip_username) >= 1
		then 
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Call failed, inputs failed to satisfy procedure requirements';
        leave sp_main; end if;
	insert into work_for values (ip_username, ip_id);

end //
delimiter ;

-- [12] fire_employee()
-- -----------------------------------------------------------------------------
/* This stored procedure fires an employee who is currently working for a delivery
service.  The only restrictions are that the employee must not be: [1] actively
controlling one or more drones; or, [2] serving as a manager for the service.
Otherwise, the firing is permitted. */
-- -----------------------------------------------------------------------------
drop procedure if exists fire_employee;
delimiter //
create procedure fire_employee (in ip_username varchar(40), in ip_id varchar(40))
sp_main: begin
	-- ensure that the employee is currently working for the service
    -- ensure that the employee isn't an active manager
	-- ensure that the employee isn't controlling any drones
	if (select count(*) from work_for where (username = ip_username and id = ip_id)) = 0
	or (select count(*) from delivery_services where manager = ip_username) >= 1
	or (select count(*) from drones where flown_by = ip_username) >= 1
		then 
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Call failed, inputs failed to satisfy procedure requirements';
        leave sp_main; end if;
	delete from work_for where username = ip_username;
end //
delimiter ;

-- [13] manage_service()
-- -----------------------------------------------------------------------------
/* This stored procedure appoints an employee who is currently hired by a delivery
service as the new manager for that service.  The only restrictions are that: [1]
the employee must not be working for any other delivery service; and, [2] the
employee can't be flying drones at the time.  Otherwise, the appointment to manager
is permitted.  The current manager is simply replaced.  And the employee must be
granted the worker role if they don't have it already. */
-- -----------------------------------------------------------------------------
drop procedure if exists manage_service;
delimiter //
create procedure manage_service (in ip_username varchar(40), in ip_id varchar(40))
sp_main: begin
	-- ensure that the employee is currently working for the service
	-- ensure that the employee is not flying any drones
    -- ensure that the employee isn't working for any other services
    -- add the worker role if necessary
	if (select count(*) from work_for where (username = ip_username and id = ip_id)) = 0
	or (select count(*) from drones where flown_by = ip_username) >= 1
	or (select count(*) from work_for where username = ip_username) >= 2
		then leave sp_main; end if;
	update delivery_services set manager = ip_username where id = ip_id;

	if (select count(*) from workers where username = ip_username) >= 1
		then leave sp_main; end if;
	insert into workers values (ip_username);
end //
delimiter ;

-- [14] takeover_drone()
-- -----------------------------------------------------------------------------
/* This stored procedure allows a valid pilot to take control of a lead drone owned
by the same delivery service, whether it's a "lone drone" or the leader of a swarm.
The current controller of the drone is simply relieved of those duties. And this
should only be executed if a "leader drone" is selected. */
-- -----------------------------------------------------------------------------
drop procedure if exists takeover_drone;
delimiter //
create procedure takeover_drone (in ip_username varchar(40), in ip_id varchar(40),
	in ip_tag integer)
sp_main: begin
	-- ensure that the employee is currently working for the service
	-- ensure that the selected drone is owned by the same service and is a leader and not follower..
	-- ensure that the employee isn't a manager
    -- ensure that the employee is a valid pilot
	if (select count(*) from work_for where (username = ip_username and id = ip_id)) = 0
	or (select count(*) from delivery_services where manager = ip_username) >= 1
	or (select count(*) from pilots where username = ip_username) = 0
	or (select count(*) from drones where ((swarm_id = ip_id and swarm_tag = ip_tag)
		or (id = ip_id and tag = ip_tag and swarm_id is null and swarm_tag is null))) = 0
		then 
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Call failed, inputs failed to satisfy procedure requirements';
        leave sp_main; end if;
	update drones set flown_by = ip_username where (id = ip_id and tag = ip_tag);
end //
delimiter ;

-- [15] join_swarm()
-- -----------------------------------------------------------------------------
/* This stored procedure takes a drone that is currently being directly controlled
by a pilot and has it join a swarm (i.e., group of drones) led by a different
directly controlled drone. A drone that is joining a swarm connot be leading a
different swarm at this time.  Also, the drones must be at the same location, but
they can be controlled by different pilots. */
-- -----------------------------------------------------------------------------
drop procedure if exists join_swarm;
delimiter //
create procedure join_swarm (in ip_id varchar(40), in ip_tag integer,
	in ip_swarm_leader_tag integer)
sp_main: begin
	-- ensure that the swarm leader is a different drone
	-- ensure that the drone joining the swarm is valid and owned by the service
    -- ensure that the drone joining the swarm is not already leading a swarm..
	-- ensure that the swarm leader drone is directly controlled
	-- ensure that the drones are at the same location
	if (select count(*) from drones where (swarm_id = ip_id and swarm_tag = ip_tag)) >= 1
	or (select count(*) from drones where (id = ip_id and tag = ip_tag)) = 0
	or (select count(*) from drones where (flown_by = null and id = ip_id and tag = ip_swarm_leader_tag)) >= 1
	or ip_tag = ip_swarm_leader_tag
	or (select hover from drones where (id = ip_id and tag = ip_tag)) != (select hover from drones where (id = ip_id and tag = ip_swarm_leader_tag))
		then 
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Call failed, inputs failed to satisfy procedure requirements';
        leave sp_main; end if;
	update drones set swarm_id = ip_id, swarm_tag = ip_swarm_leader_tag, flown_by = null where (id = ip_id and tag = ip_tag);
end //
delimiter ;

-- [16] leave_swarm()
-- -----------------------------------------------------------------------------
/* This stored procedure takes a drone that is currently in a swarm and returns
it to being directly controlled by the same pilot who's controlling the swarm. */
-- -----------------------------------------------------------------------------
drop procedure if exists leave_swarm;
delimiter //
create procedure leave_swarm (in ip_id varchar(40), in ip_swarm_tag integer)
sp_main: begin
    if (select swarm_id from drones where id = ip_id and tag = ip_swarm_tag) is null 
    or (select swarm_tag from drones where id = ip_id and tag = ip_swarm_tag) is null 
    or (select count(*) from drones where id = ip_id and tag = ip_swarm_tag) = 0 
    then 
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Call failed, inputs failed to satisfy procedure requirements';
    leave sp_main; end if;
    drop table if exists drone_duplicate;
    create table drone_duplicate as select * from drones;
    update drones 
    set swarm_id = null, swarm_tag = null, flown_by = (select flown_by from drone_duplicate where id = (select swarm_id from drone_duplicate where id=ip_id and tag = ip_swarm_tag) and tag = (select swarm_tag from drone_duplicate where id=ip_id and tag = ip_swarm_tag))
    where id = ip_id and tag = ip_swarm_tag;
    drop table drone_duplicate;
	-- ensure that the selected drone is owned by the service and flying in a swarm
end //
delimiter ;

-- [17] load_drone()
-- -----------------------------------------------------------------------------
/* This stored procedure allows us to add some quantity of fixed-size packages of
a specific ingredient to a drone's payload so that we can sell them for some
specific price to other restaurants.  The drone can only be loaded if it's located
at its delivery service's home base, and the drone must have enough capacity to
carry the increased number of items.

The change/delta quantity value must be positive, and must be added to the quantity
of the ingredient already loaded onto the drone as applicable.  And if the ingredient
already exists on the drone, then the existing price must not be changed. */
-- -----------------------------------------------------------------------------
drop procedure if exists load_drone;
delimiter //
create procedure load_drone (in ip_id varchar(40), in ip_tag integer, in ip_barcode varchar(40),
	in ip_more_packages integer, in ip_price integer)
sp_main: begin
	-- ensure that the drone being loaded is owned by the service
	-- ensure that the ingredient is valid
    -- ensure that the drone is located at the service home base
	-- ensure that the quantity of new packages is greater than zero
	-- ensure that the drone has sufficient capacity to carry the new packages
    -- add more of the ingredient to the drone+
    if (exists(select * from drones where tag = ip_tag and id = ip_id and hover = (select home_base from delivery_services where id = ip_id)))
    and (exists(select * from ingredients where barcode = ip_barcode))
    and (ip_more_packages > 0)
    and (select capacity from drones where tag = ip_tag and id = ip_id) >= ip_more_packages
    then 
		if (exists(select quantity from payload where tag = ip_tag and id = ip_id and barcode = ip_barcode)) 
			then update payload set quantity = quantity + ip_more_packages where tag = ip_tag and id = ip_id and barcode = ip_barcode;
        else 
			insert into payload values (ip_id, ip_tag, ip_barcode, ip_more_packages, ip_price);
        end if;
		leave sp_main; 
    leave sp_main; end if;
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Call failed, inputs failed to satisfy procedure requirements';
end //
	
delimiter ;

-- [18] refuel_drone()
-- -----------------------------------------------------------------------------
/* This stored procedure allows us to add more fuel to a drone. The drone can only
be refueled if it's located at the delivery service's home base. */
-- -----------------------------------------------------------------------------
drop procedure if exists refuel_drone;
delimiter //
create procedure refuel_drone (in ip_id varchar(40), in ip_tag integer, in ip_more_fuel integer)
sp_main: begin
	-- ensure that the drone being switched is valid and owned by the service
    -- ensure that the drone is located at the service home base
    if (exists(select * from drones where tag = ip_tag and id = ip_id and hover = (select home_base from delivery_services where id = ip_id)))
    then 
		update drones set fuel = fuel + ip_more_fuel where tag = ip_tag and id = ip_id;
		leave sp_main;
    end if;
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Call failed, inputs failed to satisfy procedure requirements';
end //
delimiter ;

-- [19] fly_drone()
-- -----------------------------------------------------------------------------
/* This stored procedure allows us to move a single or swarm of drones to a new
location (i.e., destination). The main constraints on the drone(s) being able to
move to a new location are fuel and space.  A drone can only move to a destination
if it has enough fuel to reach the destination and still move from the destination
back to home base.  And a drone can only move to a destination if there's enough
space remaining at the destination.  For swarms, the flight directions will always
be given to the lead drone, but the swarm must always stay together. */
-- -----------------------------------------------------------------------------
drop function if exists fuel_required;
delimiter //
create function fuel_required (ip_departure varchar(40), ip_arrival varchar(40))
	returns integer reads sql data
begin
	if (ip_departure = ip_arrival) then return 0;
    else return (select 1 + truncate(sqrt(power(arrival.x_coord - departure.x_coord, 2) + power(arrival.y_coord - departure.y_coord, 2)), 0) as fuel
		from (select x_coord, y_coord from locations where label = ip_departure) as departure,
        (select x_coord, y_coord from locations where label = ip_arrival) as arrival);
	end if;
    
end //
delimiter ;

drop procedure if exists fly_drone;
delimiter //
create procedure fly_drone (in ip_id varchar(40), in ip_tag integer, in ip_destination varchar(40))
sp_main: begin
	-- ensure that the lead drone being flown is directly controlled and owned by the service
    -- ensure that the destination is a valid location
    -- ensure that the drone isn't already at the location
    -- ensure that the drone/swarm has enough fuel to reach the destination and (then) home base
    -- ensure that the drone/swarm has enough space at the destination for the flight
    declare fuel_used integer default fuel_required((select hover from drones where tag = ip_tag and id = ip_id), ip_destination);
    declare fuel_needed integer default fuel_used + fuel_required(ip_destination,(select home_base from delivery_services where id = ip_id));
    declare size integer default (select count(*) + 1 from drones where swarm_tag = ip_tag and swarm_id = ip_id);
    if (exists(select * from drones where tag = ip_tag and id = ip_id))
    and (exists(select * from locations where label = ip_destination))
    and (select hover from  drones where tag = ip_tag and id = ip_id) != ip_destination
    and (select MIN(fuel) from drones where tag = ip_tag and id = ip_id or (swarm_tag = ip_tag and swarm_id = ip_id)) >= fuel_needed
    and (select space from locations where label = ip_destination) >= size
    then 
		update locations set space = space + size where label = (select hover from drones where tag = ip_tag and id = ip_id);
        update drones set hover = ip_destination, fuel = fuel - fuel_used where (tag = ip_tag and id = ip_id) or (swarm_tag = ip_tag and swarm_id = ip_id);
		update locations set space = space - size where label = ip_destination;
        
    leave sp_main; end if;
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Call failed, inputs failed to satisfy procedure requirements';
end //
delimiter ;


-- [20] purchase_ingredient()
-- -----------------------------------------------------------------------------
/* This stored procedure allows a restaurant to purchase ingredients from a drone
at its current location.  The drone must have the desired quantity of the ingredient
being purchased.  And the restaurant must have enough money to purchase the
ingredients.  If the transaction is otherwise valid, then the drone and restaurant
information must be changed appropriately.  Finally, we need to ensure that all
quantities in the payload table (post transaction) are greater than zero. */
-- -----------------------------------------------------------------------------
drop procedure if exists purchase_ingredient;
delimiter //
create procedure purchase_ingredient (in ip_long_name varchar(40), in ip_id varchar(40),
	in ip_tag integer, in ip_barcode varchar(40), in ip_quantity integer)
sp_main: begin
	-- ensure that the restaurant is valid
    -- ensure that the drone is valid and exists at the resturant's location
	-- ensure that the drone has enough of the requested ingredient
	-- update the drone's payload
    -- update the monies spent and gained for the drone and restaurant
    -- ensure all quantities in the payload table are greater than zero
    declare money integer default (select price from payload where tag = ip_tag and id = ip_id and barcode = ip_barcode) * ip_quantity;
    if (exists(select * from restaurants where long_name = ip_long_name))
    and (exists(select * from drones where tag = ip_tag and id = ip_id and hover = (select location from restaurants where long_name = ip_long_name)))
    and (exists(select barcode from payload where tag = ip_tag and id = ip_id and barcode = ip_barcode)) 
    and (select quantity from payload where tag = ip_tag and id = ip_id and barcode = ip_barcode) > ip_quantity
    then 
		update payload set quantity = quantity - ip_quantity where tag = ip_tag and id = ip_id and barcode = ip_barcode;
		update drones set sales = sales + money where tag = ip_tag and id = ip_id;
		update restaurants set spent = spent + money where long_name = ip_long_name;
    leave sp_main; end if;
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Call failed, inputs failed to satisfy procedure requirements';
end //
delimiter ;

-- [21] remove_ingredient()
-- -----------------------------------------------------------------------------
/* This stored procedure removes an ingredient from the system.  The removal can
occur if, and only if, the ingredient is not being carried by any drones. */
-- -----------------------------------------------------------------------------
drop procedure if exists remove_ingredient;
delimiter //
create procedure remove_ingredient (in ip_barcode varchar(40))
sp_main: begin
	-- ensure that the ingredient exists
    -- ensure that the ingredient is not being carried by any drones
    if (exists(select * from ingredients where barcode = ip_barcode))
    and (not exists(select * from payload where barcode = ip_barcode))
    then
		delete from ingredients where barcode = ip_barcode;
    leave sp_main; end if;
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Call failed, inputs failed to satisfy procedure requirements';
end //
delimiter ;

-- [22] remove_drone()
-- -----------------------------------------------------------------------------
/* This stored procedure removes a drone from the system.  The removal can
occur if, and only if, the drone is not carrying any ingredients, and if it is
not leading a swarm. */
-- -----------------------------------------------------------------------------
drop procedure if exists remove_drone;
delimiter //
create procedure remove_drone (in ip_id varchar(40), in ip_tag integer)
sp_main: begin
	-- ensure that the drone exists
    -- ensure that the drone is not carrying any ingredients
	-- ensure that the drone is not leading a swarm
    if (exists(select * from drones where tag = ip_tag and id = ip_id))
    and (not exists(select barcode from payload where tag = ip_tag and id = ip_id))
    and (not exists(select * from drones where swarm_id = ip_id and swarm_tag = ip_id))
	then
		update locations set space = space + 1 where label = (select hover from drones where tag = ip_tag and id = ip_id);
		delete from drones where tag = ip_tag and id = ip_id;
    leave sp_main; end if;
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Call failed, inputs failed to satisfy procedure requirements';
end //
delimiter ;

-- [23] remove_pilot_role()
-- -----------------------------------------------------------------------------
/* This stored procedure removes a pilot from the system.  The removal can
occur if, and only if, the pilot is not controlling any drones.  Also, if the
pilot also has a worker role, then the worker information must be maintained;
otherwise, the pilot's information must be completely removed from the system. */
-- -----------------------------------------------------------------------------
drop procedure if exists remove_pilot_role;
delimiter //
create procedure remove_pilot_role (in ip_username varchar(40))
sp_main: begin
	if (select count(*) from pilots where username = ip_username)=0 
    or (select count(*) from drones where flown_by = ip_username)>=1 
    then SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Call failed, inputs failed to satisfy procedure requirements';
    leave sp_main; end if;
	delete from pilots where username = ip_username;
    if (select count(*) from workers where username = ip_username)>=1 
    then SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Call failed, inputs failed to satisfy procedure requirements';SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Call failed, inputs failed to satisfy procedure requirements';
    leave sp_main; end if;
    delete from employees where username = ip_username;
    delete from users where username = ip_username;
	-- ensure that the pilot exists
    -- ensure that the pilot is not controlling any drones
    -- remove all remaining information unless the pilot is also a worker
end //
delimiter ;

-- [24] display_owner_view()
-- -----------------------------------------------------------------------------
/* This view displays information in the system from the perspective of an owner.
For each owner, it includes the owner's information, along with the number of
restaurants for which they provide funds and the number of different places where
those restaurants are located.  It also includes the highest and lowest ratings
for each of those restaurants, as well as the total amount of debt based on the
monies spent purchasing ingredients by all of those restaurants. And if an owner
doesn't fund any restaurants then display zeros for the highs, lows and debt. */
-- -----------------------------------------------------------------------------
create or replace view display_owner_view
as select username, first_name, last_name, address, count(long_name) as num_restaurants, count(distinct location) as num_places, coalesce(max(rating),0) as highs, coalesce(min(rating),0) as lows, coalesce(sum(spent),0) as debt
from ((select restaurant_owners.username, first_name, last_name, address
from restaurant_owners join users on users.username = restaurant_owners.username)as T left join restaurants on username = funded_by)
group by username;

-- select * from display_owner_view;

-- [25] display_employee_view()
-- -----------------------------------------------------------------------------
/* This view displays information in the system from the perspective of an 
employee.
For each employee, it includes the username, tax identifier, hiring date and
experience level, along with the license identifer and piloting experience (if
applicable), and a 'yes' or 'no' depending on the manager status of the employee. 
*/
-- -----------------------------------------------------------------------------
-- select employees.username, taxID, hired, employees.experience as employee_experience, salary, licenseID, pilots.experience as pilot_experience
-- from employees left join pilots on employees.username = pilots.username;

create or replace view display_employee_view
as select username, taxID, salary, hired, employee_experience, ifnull(licenseID, 'n/a') as licenseID, ifnull(pilot_experience,'n/a') as piloting_experience, IF(manager IS NOT NULL, 'yes', 'no') as manager_status
from
(select employees.username, taxID, hired, employees.experience as employee_experience, salary, licenseID, pilots.experience as pilot_experience
from employees left join pilots on employees.username = pilots.username) as T left join delivery_services on T.username = delivery_services.manager;

-- select * from display_employee_view;


-- [26] display_pilot_view()
-- -----------------------------------------------------------------------------
/* This view displays information in the system from the perspective of a pilot.
For each pilot, it includes the username, licenseID and piloting experience, along
with the number of drones that they are controlling. */
-- -----------------------------------------------------------------------------
create or replace view droneinfoview as
select id, tag, flown_by, swarm_id, hover, swarm_tag,
CASE
    WHEN drones.swarm_tag is NULL THEN 'follower'
    ELSE 'leader' 
END AS STATUS
from drones;

create or replace view tagdriverinfo as
select tag, id,flown_by from drones
where flown_by is not NULL;

create or replace view totalinfo as
select id, tag, flown_by, swarm_id as mswarmid,hover, swarm_tag as mtag,
case STATUS
    when 'follower' then flown_by
    when 'leader' then 
    (select info.flown_by from
        (select tag,id, flown_by from tagdriverinfo) as info 
        where (mtag = info.tag and mswarmid = info.id))
END as driver
from droneinfoview;


create or replace view display_pilot_view as
select username, licenseID, experience, count(driver) as num_drones, count(distinct hover) as num_locations
from pilots left join (select * from totalinfo) as driverinfo  on pilots.username = driverinfo.driver
group by username;

-- select tag,id, flown_by from tagdriverinfo;
-- select * from display_pilot_view;



-- [27] display_location_view()
-- -----------------------------------------------------------------------------
/* This view displays information in the system from the perspective of a location.
For each location, it includes the label, x- and y- coordinates, along with the
number of restaurants, delivery services and drones at that location. */
-- -----------------------------------------------------------------------------
create or replace view display_location_view as
select label, x_coord, y_coord, num_restaurants, num_delivery_service, count(hover) as num_drones
from (select label, x_coord, y_coord, num_restaurants, count(home_base) as num_delivery_service
from (select label, x_coord, y_coord, count(location) as num_restaurants 
from locations left join restaurants on locations.label = restaurants.location
group by label) as T1 left join delivery_services on T1.label = delivery_services.home_base
group by label) as T2 left join drones on T2.label = drones.hover
group by label;

-- select * from display_location_view


-- [28] display_ingredient_view()
-- -----------------------------------------------------------------------------
/* This view displays information in the system from the perspective of the 
ingredients.
For each ingredient that is being carried by at least one drone, it includes a list
of the various locations where it can be purchased, along with the total number of 
packages that can be purchased and the lowest and highest prices at which the ingredient is 
being sold at that location. */
-- -----------------------------------------------------------------------------
create or replace view display_ingredient_view as
select T2.iname as ingredient_name, hover as location, T2.quantity as amount_available, T2.price as min_price, T2.price as max_price 
from
((select id, tag, payload.barcode, iname, weight, quantity, price
from payload left join (select barcode, iname, weight from ingredients) as T1 on T1.barcode = payload.barcode)as T2
left join drones on (drones.id = T2.id and drones.tag = T2.tag))
order by ingredient_name asc,location asc;

-- select * from display_ingredient_view;


-- [29] display_service_view()
-- -----------------------------------------------------------------------------
/* This view displays information in the system from the perspective of a delivery
service.  It includes the identifier, name, home base location and manager for the
service, along with the total sales from the drones.  It must also include the 
number of unique ingredients along with the total cost and weight of those ingredients 
being carried by the drones. */
-- -----------------------------------------------------------------------------
create or replace view display_service_view as
select T4.id, long_name, home_base, manager, revenue, ingredient_carried, cost_carried, weight_carried
from(
select T2.id, long_name, home_base, manager, revenue, ingredient_carried from
(select delivery_services.id, long_name, home_base,manager, revenue
from delivery_services left join
    (select id, sum(sales) as revenue from drones
group by id) as T1 on delivery_services.id = T1.id) as T2
left join (
    select id, count(distinct barcode) as ingredient_carried from payload
    group by id) as T3 on T2.id = T3.id) as T4 left join (select id, sum(quantity * price) as cost_carried, sum(quantity* weight) as weight_carried
from payload left join (select barcode, iname, weight from ingredients) as Tl on Tl.barcode = payload.barcode
group by id) as T5 on T4.id = T5.id;

-- select * from display_service_view;

