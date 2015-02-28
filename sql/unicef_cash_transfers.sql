
-- create table unicef_cash_transfers(
-- Region varchar(50),
-- District varchar(50),
-- Name varchar(50),
-- area_type varchar(50),
-- Number_of_HHs int,
-- Number_of_Individuals int,
-- Type varchar(50),
-- org varchar(50))


alter table unicef_cash_transfers add column district_id int;

update unicef_cash_transfers set district = upper(district);

update unicef_cash_transfers
set district_id = dl.district_id
from district_lookup dl
where unicef_cash_transfers.district = dl.district_name;

update unicef_cash_transfers
set district_id = dl.district_id
from district_lookup dl
where unicef_cash_transfers.district = dl.district_alt and 
        unicef_cash_transfers.district_id is null;

select distinct district from unicef_cash_transfers where district_id is null;

