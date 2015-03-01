-- create table brics_beneficiary_baseline(
-- ID varchar(50),
-- CSI_IDP_urban int,
-- CSI_Reduced int,
-- fcs float,
-- fcs_Category varchar(10),
-- hdds int,
-- asset_binary int,
-- CREATED_BY varchar(15),
-- SURVEY_NAME varchar(50),
-- SURVEY_VERSION int,
-- START_DATE varchar(10),
-- END_DATE varchar(10),
-- LATITUDE numeric(16,10),
-- LONGITUDE numeric(16,10),
-- ACCURACY varchar(10),
-- ALTITUDE varchar(10),
-- SUBMISSION_DATE varchar(10),
-- region varchar(25),
-- district varchar(25),
-- Community varchar(25),
-- hh_relationship varchar(25),
-- hhh_gender varchar(6),
-- hhh_age int,
-- hhh_marital varchar(20),
-- hhh_literacy boolean,
-- hhh_highest_ed varchar(20),
-- males_0_to_5_years int,
-- females_0_to_5_years int,
-- males_5_14_years int,
-- females_5_14_years int,
-- males_15_17_years int,
-- females_15_17_years int,
-- males_18_44_years int,
-- females_18_44_years int,
-- males_45_64_and_above_years int,
-- females_45_64_and_above_years int,
-- males_65_and_above_years int,
-- females__65_and_above_years int,
-- total_hh_size int,
-- hh_m_5_14_in_school int,
-- hh_f_5_14_in_school int,
-- hh_total_literate int,
-- hh_challenges varchar(250),
-- hh_shock_resilience varchar(15),
-- hh_income_sources varchar(250),
-- hh_income_primary_source varchar(50),
-- hh_m_contribute_income int,
-- hh_f_contribute_income int);




alter table brics_beneficiary_baseline add column district_id int;

update brics_beneficiary_baseline set district = upper(district);

update brics_beneficiary_baseline
set district_id = dl.district_id
from district_lookup dl
where brics_beneficiary_baseline.district = dl.district_name;

update brics_beneficiary_baseline
set district_id = dl.district_id
from district_lookup dl
where brics_beneficiary_baseline.district = dl.district_alt and 
        brics_beneficiary_baseline.district_id is null;

select distinct district from brics_beneficiary_baseline where district_id is null;

update brics_beneficiary_baseline set Community = upper(Community);

select * from district_lookup 
where 
district_name like 'GAA%' or
district_name like 'MAT%' or
district_name like 'XAM%' or
district_name like '%WAD%';

insert into district_lookup values('GAALKACYO','GALKAACYO',1801,'MUDUG',18);
insert into district_lookup values('MATABAAN','MATABAN',2005,'HIRAAN',20);
insert into district_lookup values('XAMAR JABJAB','HAMAR JAJAB',2205,'BANADIR',22);
insert into district_lookup values('HAWL WADAAG','HOWL WADAG',2212,'BANADIR',22);

