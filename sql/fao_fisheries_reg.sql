-- create table fao_fisheries_reg(
-- Data_Entry_Number varchar(50),
-- User_Full_Names varchar(50),
-- User_Email_Address varchar(50),
-- Date_Created varchar(50),
-- Time_Created varchar(50),
-- District varchar(50),
-- Fishermen_s_Association varchar(50),
-- Landing_Site varchar(50),
-- Date_of_Registration varchar(50),
-- Registrar_s_Name varchar(50),
-- First_Name varchar(50),
-- Middle_Name varchar(50),
-- Last_Name varchar(50),
-- Nickname varchar(50),
-- Date_of_Birth varchar(50),
-- Birth_Place varchar(50),
-- Phone_Number varchar(50),
-- When_Fishing varchar(50),
-- Crew_Job varchar(50),
-- Boat_Ownership varchar(50),
-- Vessel_Type varchar(50),
-- Gear_Bottom_set_gillnet_hoos_dhig int,
-- Gear_Driftnet__jiidmo int,
-- Gear_Hand_collection_gacan_ku_ururin int,
-- Gear_Handline_idaad int,
-- Gear_Longline_shakad_ama_jeesto int,
-- Gear_Traps_dabin_ama_jilbis int,
-- Gear_Trawler_jariif int,
-- Gear varchar(150),
-- Predominant_Market varchar(50),
-- Secondary_market varchar(50),
-- Do_you_carry_ice_on_board varchar(10),
-- Gender_of_Boat_Owner varchar(10),
-- Mothers_Name varchar(50),
-- Name_of_Head_of_Household varchar(50),
-- Your_Father_s_Name varchar(50),
-- Your_Paternal_Grandfather_s_Name varchar(50),
-- Your_Paternal_great_grandfather_s_name varchar(50),
-- Household_Activities_Animal_husbandry int,
-- Household_Activities_Cropping int,
-- Household_Activities_Fishing int,
-- Household_Activities_Other int,
-- Household_Activities_Petty_trade int,
-- Household_Activities_Small_business int,
-- Household_Activities varchar(70),
-- Other_Support_of_Household_Animal_sales int,
-- Other_Support_of_Household_Gifts_zaqat int,
-- Other_Support_of_Household_Land_rent int,
-- Other_Support_of_Household_Other int,
-- Other_Support_of_Household_Remittances int,
-- Other_Support_of_Household varchar(50),
-- Biometrics boolean,
-- Photo varchar(50),
-- Comments varchar(50));


alter table fao_fisheries_reg add column district_id int;

update fao_fisheries_reg set district = upper(district);

update fao_fisheries_reg
set district_id = dl.district_id
from district_lookup dl
where fao_fisheries_reg.district = dl.district_name;

update fao_fisheries_reg
set district_id = dl.district_id
from district_lookup dl
where fao_fisheries_reg.district = dl.district_alt and 
        fao_fisheries_reg.district_id is null;

select distinct district from fao_fisheries_reg where district_id is null;

select * from district_lookup where district_name like 'BAN%';

insert into district_lookup values('BANDARBEYLA','BANDARBAYLA',1602,'BARI',16);

###add geometry columns

alter table fao_fisheries_reg add column the_geom varchar(13000);
alter table fao_fisheries_reg add column area float;

update fao_fisheries_reg set the_geom = dg.the_geom
from district_geo dg
where dg.district_id = fao_fisheries_reg.district_id;

update fao_fisheries_reg set area = dg.area
from district_geo dg
where dg.district_id = fao_fisheries_reg.district_id;

select count(*) from fao_fisheries_reg where the_geom is null;
