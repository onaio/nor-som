-- drop table brics_reg_data;
-- create table brics_reg_data(
-- SESSION_ID varchar(40),
-- CREATED_BY varchar(15),
-- START_DATE varchar(15),
-- END_DATE varchar(15),
-- LATITUDE numeric(16,10),
-- LONGITUDE numeric(16,10),
-- ACCURACY varchar(4),
-- ALTITUDE varchar(16),
-- SUBMISSION_DATE varchar(15),
-- NGO varchar(30),
-- REGION varchar(20),
-- DISTRICT varchar(20),
-- VILLAGE varchar(30),
-- HH_INFO_HHH_GENDER varchar(6),
-- HH_INFO_HHH_AGE int,
-- HH_INFO_HHH_MARITAL_STATUS varchar(18),
-- HH_INFO_HHH_LITERATE varchar(7),
-- HH_INFO_HHH_EDUCATION_LEVEL varchar(18),
-- HH_INFO_HHH_RESPONDENT_RELATIONSHIP varchar(20),
-- HH_INFO_COMPOSITION_MALES_0_5_years int,
-- HH_INFO_COMPOSITION_FEMALES_0_5_years int,
-- HH_INFO_COMPOSITION_MALES_5_14_YRS int,
-- HH_INFO_COMPOSITION_FEMALES_5_14_YRS int,
-- HH_INFO_COMPOSITION_MALES_15_44_YRS int,
-- HH_INFO_COMPOSITION_FEMALES_15_44_YRS int,
-- HH_INFO_COMPOSITION_MALES_45_64_YRS int,
-- HH_INFO_COMPOSITION_FEMALES_45_64_YRS int,
-- HH_SIZE_TOTAL int,
-- HH_INFO_COMPOSITION_LITERATE int,
-- HH_INFO_RESIDENTIAL_STATUS varchar(20),
-- HH_INFO_INCOME_SOURCES varchar(250),
-- HH_INFO_MAIN_INCOME_SOURCE varchar(40),
-- HH_INFO_MALE_CONTRIBUTE int,
-- HH_INFO_FEMALE_CONTRIBUTE int,
-- HH_INFO_MAIN_CHALLENGES varchar(250),
-- HH_INFO_MAIN_CHALLENGES_OTHER varchar(50),
-- HH_INFO_DROUGHT_AND_FLOODS varchar(50),
-- HH_INFO_FOOD_SOURCE varchar(50),
-- HH_INSUFFICIENT_FOOD varchar(10),
-- HH_INSUFICIENT_FOOD_IF_YES varchar(50),
-- HH_TYPE_OF_SHELTER varchar(50),
-- HH_DRINKING_WATER_SOURCE varchar(50),
-- HH_SUFFICIENT_DRINKING_WATER varchar(10),
-- HH_PHONE_NUMBER varchar(50),
-- ACTIVITES int);



select hh_info_residential_status,
count(hh_info_residential_status) 
from brics_reg_data
group by 1 order by 2 desc;

--alter table brics_reg_data add column shelter_groups varchar(50);

update brics_reg_data
set shelter_groups = hh_type_of_shelter
where hh_type_of_shelter not in
('Mud_Brick','Plastic_Sheeting','None','Wattle_and_Daub',
        'Tent_Somalia_Canvas','Tent_Light_Weight','ISSB_Brick')

select shelter_groups,
count(shelter_groups) 
from brics_reg_data
group by 1 order by 2 desc;


update brics_reg_data
set main_income_groups = 'Other'
where hh_info_main_income_source in 
('Sale_of_fishing_products','Begging','Salary_private_sector',
'Community_help_zakat','Dont_know','Monetary_transfers_from_ngos',
'Transport','Other_nonmonetary_sources','Monetary_transfers_from_NGO',
'Other_monetary_sources','Other_humanitarian_assistance',
'Monetary_transfers_from_Mosque','Wholesale_trade');

update brics_reg_data
set main_income_groups = hh_info_main_income_source
where main_income_groups is null;

select main_income_groups, 
count(main_income_groups) 
from brics_reg_data 
group by 1 order by 2 desc;

####this is now old, replaced by main_income_groups ^^^
-- select hh_info_main_income_source, 
-- count(hh_info_main_income_source) 
-- from brics_reg_data 
-- group by 1 order by 2 desc;

select hh_info_main_challenges, 
count(hh_info_main_challenges) 
from brics_reg_data 
group by 1 order by 2 desc;

select hh_insufficient_food, 
count(hh_insufficient_food) 
from brics_reg_data 
group by 1 order by 2 desc;

select hh_sufficient_drinking_water, 
count(hh_sufficient_drinking_water) 
from brics_reg_data 
group by 1 order by 2 desc;




###adding refined_ags columns to brics_reg_data as booleans so it all works on a single table
update brics_reg_data set CAMPAIGN_ANIMAL_TREATMENT = true from brics_ags_lookup look where look.session_id = brics_reg_data.session_id and look.refined_ags = 'CAMPAIGN ANIMAL TREATMENT';
update brics_reg_data set CAMPAIGN_IYCF_AWARENESS_TRAINING = true from brics_ags_lookup look where look.session_id = brics_reg_data.session_id and look.refined_ags = 'CAMPAIGN IYCF AWARENESS TRAINING ';
update brics_reg_data set CAMPAIGN_SANITATION_AND_WASH_AWARENESS = true from brics_ags_lookup look where look.session_id = brics_reg_data.session_id and look.refined_ags = 'CAMPAIGN SANITATION AND WASH AWARENESS';
update brics_reg_data set CASH_FOR_WORK = true from brics_ags_lookup look where look.session_id = brics_reg_data.session_id and look.refined_ags = 'CASH FOR WORK';
update brics_reg_data set CASH_GRANTS = true from brics_ags_lookup look where look.session_id = brics_reg_data.session_id and look.refined_ags = 'CASH GRANTS';
update brics_reg_data set CASH_TRANSFERS_UNCONDITIONAL = true from brics_ags_lookup look where look.session_id = brics_reg_data.session_id and look.refined_ags = 'CASH TRANSFERS UNCONDITIONAL ';
update brics_reg_data set CHWS_AND_HYGIENE_PROMOTERS_RECRUIT_AND_TRAIN = true from brics_ags_lookup look where look.session_id = brics_reg_data.session_id and look.refined_ags = 'CHWS AND HYGIENE PROMOTERS RECRUIT AND TRAIN';
update brics_reg_data set COMMUNITY_DISASTER_MANAGEMENT_COMMITTEES_CDMC_ESTABLISH_AND_TRAIN = true from brics_ags_lookup look where look.session_id = brics_reg_data.session_id and look.refined_ags = 'COMMUNITY DISASTER MANAGEMENT COMMITTEES (CDMC) ESTABLISH AND TRAIN ';
update brics_reg_data set COMMUNITY_PRODUCTIVE_ASSETS_BUILDING = true from brics_ags_lookup look where look.session_id = brics_reg_data.session_id and look.refined_ags = 'COMMUNITY PRODUCTIVE ASSETS BUILDING';
update brics_reg_data set COMMUNITY_WASH_GROUPS_ESTABLISH_AND_TRAIN_AND_EQUIP = true from brics_ags_lookup look where look.session_id = brics_reg_data.session_id and look.refined_ags = 'COMMUNITY WASH GROUPS ESTABLISH AND TRAIN AND EQUIP';
update brics_reg_data set CONSTRUCTION_AND_REHABILITATION_OF_PUBLIC_FACILITIES = true from brics_ags_lookup look where look.session_id = brics_reg_data.session_id and look.refined_ags = 'CONSTRUCTION AND REHABILITATION OF PUBLIC FACILITIES';
update brics_reg_data set CONSTRUCTION_AND_REHABILITATION_OF_SHELTERS = true from brics_ags_lookup look where look.session_id = brics_reg_data.session_id and look.refined_ags = 'CONSTRUCTION AND REHABILITATION OF SHELTERS';
update brics_reg_data set CONSTRUCTION_AND_REHABILITATION_WATER_SOURCES_AND_RESERVOIRS = true from brics_ags_lookup look where look.session_id = brics_reg_data.session_id and look.refined_ags = 'CONSTRUCTION AND REHABILITATION WATER SOURCES & RESERVOIRS';
update brics_reg_data set COUNSELLING_ON_GBV_AND_LINK_TO_SERVICE_PROVIDERS_FOR_VICTIMS = true from brics_ags_lookup look where look.session_id = brics_reg_data.session_id and look.refined_ags = 'COUNSELLING ON GBV AND LINK TO SERVICE-PROVIDERS FOR VICTIMS';
update brics_reg_data set DEVELOP_COMMUNITY_WATER_MANAGEMENT_PLANS = true from brics_ags_lookup look where look.session_id = brics_reg_data.session_id and look.refined_ags = 'DEVELOP COMMUNITY WATER MANAGEMENT PLANS';
update brics_reg_data set DEVELOP_SOLID_WASTE_MANAGEMENT_SYSTEM = true from brics_ags_lookup look where look.session_id = brics_reg_data.session_id and look.refined_ags = 'DEVELOP SOLID WASTE MANAGEMENT SYSTEM';
update brics_reg_data set DISTRIBUTION_OF_LIVELIHOOD_INPUTS = true from brics_ags_lookup look where look.session_id = brics_reg_data.session_id and look.refined_ags = 'DISTRIBUTION OF LIVELIHOOD INPUTS';
update brics_reg_data set DISTRIBUTION_OF_NFIs = true from brics_ags_lookup look where look.session_id = brics_reg_data.session_id and look.refined_ags = 'DISTRIBUTION OF NFIs';
update brics_reg_data set EARLY_WARNING_AND_EARLY_ACTION_SYSTEM = true from brics_ags_lookup look where look.session_id = brics_reg_data.session_id and look.refined_ags = 'EARLY WARNING AND EARLY ACTION SYSTEM';
update brics_reg_data set LIVELIHOOD_TRAINING = true from brics_ags_lookup look where look.session_id = brics_reg_data.session_id and look.refined_ags = 'LIVELIHOOD TRAINING';
update brics_reg_data set LOBBYING_AND_ADVOCACY = true from brics_ags_lookup look where look.session_id = brics_reg_data.session_id and look.refined_ags = 'LOBBYING & ADVOCACY';
update brics_reg_data set MARKET_ANALYSIS = true from brics_ags_lookup look where look.session_id = brics_reg_data.session_id and look.refined_ags = 'MARKET ANALYSIS';
update brics_reg_data set NRM_TRAINING_AND_IMPLEMENTATION = true from brics_ags_lookup look where look.session_id = brics_reg_data.session_id and look.refined_ags = 'NRM TRAINING AND IMPLEMENTATION';
update brics_reg_data set PEACE_BUILDING_TRAINING_AND_COMMITTEES = true from brics_ags_lookup look where look.session_id = brics_reg_data.session_id and look.refined_ags = 'PEACE BUILDING TRAINING AND COMMITTEES';
update brics_reg_data set SELF_HELP_GROUPS_ESTABLISH_AND_TRAIN_AND_EQUIP = true from brics_ags_lookup look where look.session_id = brics_reg_data.session_id and look.refined_ags = 'SELF HELP GROUPS ESTABLISH AND TRAIN AND EQUIP';
update brics_reg_data set WATER_ACCESS_AND_QUALITY_IMPROVEMENT = true from brics_ags_lookup look where look.session_id = brics_reg_data.session_id and look.refined_ags = 'WATER ACCESS AND QUALITY IMPROVEMENT';



alter table brics_reg_data add column CATEGORY_RESILIENCE BOOLEAN;
alter table brics_reg_data add column CATEGORY_WASH BOOLEAN;
alter table brics_reg_data add column CATEGORY_SHELTER BOOLEAN;
alter table brics_reg_data add column CATEGORY_FOOD_SECURITY_AND_LIVELIHOOD BOOLEAN;

UPDATE brics_reg_data SET CATEGORY_RESILIENCE = FALSE;
UPDATE brics_reg_data SET CATEGORY_WASH = FALSE;
UPDATE brics_reg_data SET CATEGORY_SHELTER = FALSE;
UPDATE brics_reg_data SET CATEGORY_FOOD_SECURITY_AND_LIVELIHOOD = FALSE;

UPDATE brics_reg_data set CATEGORY_RESILIENCE = true from refined_ags_output_lookup olook join brics_ags_lookup blook on blook.refined_ags = olook.refined_ags where blook.session_id = brics_reg_data.session_id and olook.output_id = 1;
UPDATE brics_reg_data set CATEGORY_WASH = true from refined_ags_output_lookup olook join brics_ags_lookup blook on blook.refined_ags = olook.refined_ags where blook.session_id = brics_reg_data.session_id and olook.output_id = 2;
UPDATE brics_reg_data set CATEGORY_SHELTER = true from refined_ags_output_lookup olook join brics_ags_lookup blook on blook.refined_ags = olook.refined_ags where blook.session_id = brics_reg_data.session_id and olook.output_id = 3;
UPDATE brics_reg_data set CATEGORY_FOOD_SECURITY_AND_LIVELIHOOD = true from refined_ags_output_lookup olook join brics_ags_lookup blook on blook.refined_ags = olook.refined_ags where blook.session_id = brics_reg_data.session_id and olook.output_id = 4;


##CHECKING the category update query results match the activity columns
-- SELECT * FROM brics_reg_data where
-- CAMPAIGN_ANIMAL_TREATMENT IS FALSE AND
-- CAMPAIGN_IYCF_AWARENESS_TRAINING IS FALSE AND
-- CAMPAIGN_SANITATION_AND_WASH_AWARENESS IS FALSE AND
-- CASH_FOR_WORK IS FALSE AND
-- CASH_GRANTS IS FALSE AND
-- CASH_TRANSFERS_UNCONDITIONAL IS FALSE AND
-- CHWS_AND_HYGIENE_PROMOTERS_RECRUIT_AND_TRAIN IS FALSE AND
-- COMMUNITY_DISASTER_MANAGEMENT_COMMITTEES_CDMC_ESTABLISH_AND_TRAIN IS FALSE AND
-- COMMUNITY_PRODUCTIVE_ASSETS_BUILDING IS FALSE AND
-- COMMUNITY_WASH_GROUPS_ESTABLISH_AND_TRAIN_AND_EQUIP IS FALSE AND
-- CONSTRUCTION_AND_REHABILITATION_OF_PUBLIC_FACILITIES IS FALSE AND
-- CONSTRUCTION_AND_REHABILITATION_OF_SHELTERS IS FALSE AND
-- CONSTRUCTION_AND_REHABILITATION_WATER_SOURCES_AND_RESERVOIRS IS FALSE AND
-- COUNSELLING_ON_GBV_AND_LINK_TO_SERVICE_PROVIDERS_FOR_VICTIMS IS FALSE AND
-- DEVELOP_COMMUNITY_WATER_MANAGEMENT_PLANS IS FALSE AND
-- DEVELOP_SOLID_WASTE_MANAGEMENT_SYSTEM IS FALSE AND
-- DISTRIBUTION_OF_LIVELIHOOD_INPUTS IS FALSE AND
-- DISTRIBUTION_OF_NFIs IS FALSE AND
-- EARLY_WARNING_AND_EARLY_ACTION_SYSTEM IS FALSE AND
-- LIVELIHOOD_TRAINING IS FALSE AND
-- LOBBYING_AND_ADVOCACY IS FALSE AND
-- MARKET_ANALYSIS IS FALSE AND
-- NRM_TRAINING_AND_IMPLEMENTATION IS FALSE AND
-- PEACE_BUILDING_TRAINING_AND_COMMITTEES IS FALSE AND
-- SELF_HELP_GROUPS_ESTABLISH_AND_TRAIN_AND_EQUIP IS FALSE AND
-- WATER_ACCESS_AND_QUALITY_IMPROVEMENT IS FALSE;

## ^ vs this
-- select * from brics_reg_data 
-- where 
-- CATEGORY_RESILIENCE IS FALSE AND
-- CATEGORY_WASH IS FALSE AND
-- CATEGORY_SHELTER IS FALSE AND
-- CATEGORY_FOOD_SECURITY_AND_LIVELIHOOD IS FALSE



alter table brics_reg_data add column the_geom varchar(13000);
alter table brics_reg_data add column area float;

update brics_reg_data set the_geom = dg.the_geom
from district_geo dg
where dg.district_id = brics_reg_data.district_id;

update brics_reg_data set area = dg.area
from district_geo dg
where dg.district_id = brics_reg_data.district_id;






