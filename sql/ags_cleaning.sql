
select ags.refined_ags,count(distinct brd.session_id)
from brics_reg_data_refined_ags_lookup ags
join brics_reg_data brd using(session_id)
group by 1 order by 2 desc;


--create table ags_raw(
--session_id varchar(50),
--_1 varchar(10),
--_2 varchar(10),
--_3 varchar(10),
--_4 varchar(10),
--_5 varchar(10),
--_6 varchar(10),
--_7 varchar(10),
--_8 varchar(10),
--_9 varchar(10),
--_10 varchar(10),
--_11 varchar(10),
--_12 varchar(10),
--_13 varchar(10),
--_14 varchar(10));

--copy ags_raw from '/users/elliottwilkes/dfid-dash/data/ags_raw.csv' CSV;


--select distinct stack.session_id,stack.ags_code into brics_ags_lookup
--from(
--        select session_id,_1 as ags_code from ags_raw union all
--        select session_id,_2 as ags_code from ags_raw union all
--        select session_id,_3 as ags_code from ags_raw union all
--        select session_id,_4 as ags_code from ags_raw union all
--        select session_id,_5 as ags_code from ags_raw union all
--        select session_id,_6 as ags_code from ags_raw union all
--        select session_id,_7 as ags_code from ags_raw union all
--        select session_id,_8 as ags_code from ags_raw union all
--        select session_id,_9 as ags_code from ags_raw union all
--        select session_id,_10 as ags_code from ags_raw union all
--        select session_id,_11 as ags_code from ags_raw union all
--        select session_id,_12 as ags_code from ags_raw union all
--        select session_id,_13 as ags_code from ags_raw union all
--        select session_id,_14 as ags_code from ags_raw
--        )stack
--where stack.ags_code is not null
--group by 1,2;





update brics_ags_lookup
set ags_code = upper(ags_code)


--create table ags_code_refined_ags_lookup(
--ags_code varchar(15),
--refined_ags varchar(75));
--
--copy ags_code_refined_ags_lookup 
--from '/users/elliottwilkes/dfid-dash/data/ags_code_refined_ags_lookup.csv' 
--CSV header;


select * from ags_code_refined_ags_lookup  limit 5;
select ags_code from brics_ags_lookup where refined_ags is null
group by 1

--update brics_ags_lookup
--set ags_code = f.ags_code_new
--from ags_fix f
--where brics_ags_lookup.ags_code = f.ags_code_old




select 
count(distinct case when refined_ags is null then session_id end) as _null,
count(distinct case when refined_ags is not null then session_id end) as _notnull
from brics_ags_lookup;

--update brics_ags_lookup 
--set refined_ags = agsl.refined_ags
--from ags_code_refined_ags_lookup agsl
--where brics_ags_lookup.ags_code = agsl.ags_code;
--
select distinct refined_ags from ags_code_refined_ags_lookup order by 1

--alter table brics_reg_data add column COMMUNITY_WASH_GROUPS_ESTABLISH_AND_TRAIN_AND_EQUIP boolean;
--alter table brics_reg_data add column DEVELOP_SOLID_WASTE_MANAGEMENT_SYSTEM boolean;
--alter table brics_reg_data add column CAMPAIGN_ANIMAL_TREATMENT boolean;
--alter table brics_reg_data add column CASH_GRANTS boolean;
--alter table brics_reg_data add column CHWS_AND_HYGIENE_PROMOTERS_RECRUIT_AND_TRAIN boolean;
--alter table brics_reg_data add column CONSTRUCTION_AND_REHABILITATION_OF_PUBLIC_FACILITIES boolean;
--alter table brics_reg_data add column EARLY_WARNING_AND_EARLY_ACTION_SYSTEM boolean;
--alter table brics_reg_data add column CASH_TRANSFERS_UNCONDITIONAL boolean;
--alter table brics_reg_data add column WATER_ACCESS_AND_QUALITY_IMPROVEMENT boolean;
--alter table brics_reg_data add column COMMUNITY_DISASTER_MANAGEMENT_COMMITTEES_CDMC_ESTABLISH_AND_TRAIN boolean;
--alter table brics_reg_data add column MARKET_ANALYSIS boolean;
--alter table brics_reg_data add column CASH_FOR_WORK boolean;
--alter table brics_reg_data add column COUNSELLING_ON_GBV_AND_LINK_TO_SERVICE_PROVIDERS_FOR_VICTIMS boolean;
--alter table brics_reg_data add column PEACE_BUILDING_TRAINING_AND_COMMITTEES boolean;
--alter table brics_reg_data add column CAMPAIGN_IYCF_AWARENESS_TRAINING boolean;
--alter table brics_reg_data add column COMMUNITY_PRODUCTIVE_ASSETS_BUILDING boolean;
--alter table brics_reg_data add column DEVELOP_COMMUNITY_WATER_MANAGEMENT_PLANS boolean;
--alter table brics_reg_data add column DISTRIBUTION_OF_NFIs boolean;
--alter table brics_reg_data add column NRM_TRAINING_AND_IMPLEMENTATION boolean;
--alter table brics_reg_data add column SELF_HELP_GROUPS_ESTABLISH_AND_TRAIN_AND_EQUIP boolean;
--alter table brics_reg_data add column LOBBYING_AND_ADVOCACY boolean;
--alter table brics_reg_data add column CAMPAIGN_SANITATION_AND_WASH_AWARENESS boolean;
--alter table brics_reg_data add column CONSTRUCTION_AND_REHABILITATION_WATER_SOURCES_AND_RESERVOIRS boolean;
--alter table brics_reg_data add column DISTRIBUTION_OF_LIVELIHOOD_INPUTS boolean;
--alter table brics_reg_data add column CONSTRUCTION_AND_REHABILITATION_OF_SHELTERS boolean;
--alter table brics_reg_data add column LIVELIHOOD_TRAINING boolean;

--
--update brics_reg_data set COMMUNITY_WASH_GROUPS_ESTABLISH_AND_TRAIN_AND_EQUIP = false;
--update brics_reg_data set DEVELOP_SOLID_WASTE_MANAGEMENT_SYSTEM = false;
--update brics_reg_data set CAMPAIGN_ANIMAL_TREATMENT = false;
--update brics_reg_data set CASH_GRANTS = false;
--update brics_reg_data set CHWS_AND_HYGIENE_PROMOTERS_RECRUIT_AND_TRAIN = false;
--update brics_reg_data set CONSTRUCTION_AND_REHABILITATION_OF_PUBLIC_FACILITIES = false;
--update brics_reg_data set EARLY_WARNING_AND_EARLY_ACTION_SYSTEM = false;
--update brics_reg_data set CASH_TRANSFERS_UNCONDITIONAL = false;
--update brics_reg_data set WATER_ACCESS_AND_QUALITY_IMPROVEMENT = false;
--update brics_reg_data set COMMUNITY_DISASTER_MANAGEMENT_COMMITTEES_CDMC_ESTABLISH_AND_TRAIN = false;
--update brics_reg_data set MARKET_ANALYSIS = false;
--update brics_reg_data set CASH_FOR_WORK = false;
--update brics_reg_data set COUNSELLING_ON_GBV_AND_LINK_TO_SERVICE_PROVIDERS_FOR_VICTIMS = false;
--update brics_reg_data set PEACE_BUILDING_TRAINING_AND_COMMITTEES = false;
--update brics_reg_data set CAMPAIGN_IYCF_AWARENESS_TRAINING = false;
--update brics_reg_data set COMMUNITY_PRODUCTIVE_ASSETS_BUILDING = false;
--update brics_reg_data set DEVELOP_COMMUNITY_WATER_MANAGEMENT_PLANS = false;
--update brics_reg_data set DISTRIBUTION_OF_NFIs = false;
--update brics_reg_data set NRM_TRAINING_AND_IMPLEMENTATION = false;
--update brics_reg_data set SELF_HELP_GROUPS_ESTABLISH_AND_TRAIN_AND_EQUIP = false;
--update brics_reg_data set LOBBYING_AND_ADVOCACY = false;
--update brics_reg_data set CAMPAIGN_SANITATION_AND_WASH_AWARENESS = false;
--update brics_reg_data set CONSTRUCTION_AND_REHABILITATION_WATER_SOURCES_AND_RESERVOIRS = false;
--update brics_reg_data set DISTRIBUTION_OF_LIVELIHOOD_INPUTS = false;
--update brics_reg_data set CONSTRUCTION_AND_REHABILITATION_OF_SHELTERS = false;
--update brics_reg_data set LIVELIHOOD_TRAINING = false;

--update brics_reg_data set CAMPAIGN_ANIMAL_TREATMENT = true from brics_ags_lookup look where look.session_id = brics_reg_data.session_id and look.refined_ags = 'CAMPAIGN ANIMAL TREATMENT';
--update brics_reg_data set CAMPAIGN_IYCF_AWARENESS_TRAINING = true from brics_ags_lookup look where look.session_id = brics_reg_data.session_id and look.refined_ags = 'CAMPAIGN IYCF AWARENESS TRAINING ';
--update brics_reg_data set CAMPAIGN_SANITATION_AND_WASH_AWARENESS = true from brics_ags_lookup look where look.session_id = brics_reg_data.session_id and look.refined_ags = 'CAMPAIGN SANITATION AND WASH AWARENESS';
--update brics_reg_data set CASH_FOR_WORK = true from brics_ags_lookup look where look.session_id = brics_reg_data.session_id and look.refined_ags = 'CASH FOR WORK';
--update brics_reg_data set CASH_GRANTS = true from brics_ags_lookup look where look.session_id = brics_reg_data.session_id and look.refined_ags = 'CASH GRANTS';
--update brics_reg_data set CASH_TRANSFERS_UNCONDITIONAL = true from brics_ags_lookup look where look.session_id = brics_reg_data.session_id and look.refined_ags = 'CASH TRANSFERS UNCONDITIONAL ';
--update brics_reg_data set CHWS_AND_HYGIENE_PROMOTERS_RECRUIT_AND_TRAIN = true from brics_ags_lookup look where look.session_id = brics_reg_data.session_id and look.refined_ags = 'CHWS AND HYGIENE PROMOTERS RECRUIT AND TRAIN';
--update brics_reg_data set COMMUNITY_DISASTER_MANAGEMENT_COMMITTEES_CDMC_ESTABLISH_AND_TRAIN = true from brics_ags_lookup look where look.session_id = brics_reg_data.session_id and look.refined_ags = 'COMMUNITY DISASTER MANAGEMENT COMMITTEES (CDMC) ESTABLISH AND TRAIN ';
--update brics_reg_data set COMMUNITY_PRODUCTIVE_ASSETS_BUILDING = true from brics_ags_lookup look where look.session_id = brics_reg_data.session_id and look.refined_ags = 'COMMUNITY PRODUCTIVE ASSETS BUILDING';
--update brics_reg_data set COMMUNITY_WASH_GROUPS_ESTABLISH_AND_TRAIN_AND_EQUIP = true from brics_ags_lookup look where look.session_id = brics_reg_data.session_id and look.refined_ags = 'COMMUNITY WASH GROUPS ESTABLISH AND TRAIN AND EQUIP';
--update brics_reg_data set CONSTRUCTION_AND_REHABILITATION_OF_PUBLIC_FACILITIES = true from brics_ags_lookup look where look.session_id = brics_reg_data.session_id and look.refined_ags = 'CONSTRUCTION AND REHABILITATION OF PUBLIC FACILITIES';
--update brics_reg_data set CONSTRUCTION_AND_REHABILITATION_OF_SHELTERS = true from brics_ags_lookup look where look.session_id = brics_reg_data.session_id and look.refined_ags = 'CONSTRUCTION AND REHABILITATION OF SHELTERS';
--update brics_reg_data set CONSTRUCTION_AND_REHABILITATION_WATER_SOURCES_AND_RESERVOIRS = true from brics_ags_lookup look where look.session_id = brics_reg_data.session_id and look.refined_ags = 'CONSTRUCTION AND REHABILITATION WATER SOURCES & RESERVOIRS';
--update brics_reg_data set COUNSELLING_ON_GBV_AND_LINK_TO_SERVICE_PROVIDERS_FOR_VICTIMS = true from brics_ags_lookup look where look.session_id = brics_reg_data.session_id and look.refined_ags = 'COUNSELLING ON GBV AND LINK TO SERVICE-PROVIDERS FOR VICTIMS';
--update brics_reg_data set DEVELOP_COMMUNITY_WATER_MANAGEMENT_PLANS = true from brics_ags_lookup look where look.session_id = brics_reg_data.session_id and look.refined_ags = 'DEVELOP COMMUNITY WATER MANAGEMENT PLANS';
--update brics_reg_data set DEVELOP_SOLID_WASTE_MANAGEMENT_SYSTEM = true from brics_ags_lookup look where look.session_id = brics_reg_data.session_id and look.refined_ags = 'DEVELOP SOLID WASTE MANAGEMENT SYSTEM';
--update brics_reg_data set DISTRIBUTION_OF_LIVELIHOOD_INPUTS = true from brics_ags_lookup look where look.session_id = brics_reg_data.session_id and look.refined_ags = 'DISTRIBUTION OF LIVELIHOOD INPUTS';
--update brics_reg_data set DISTRIBUTION_OF_NFIs = true from brics_ags_lookup look where look.session_id = brics_reg_data.session_id and look.refined_ags = 'DISTRIBUTION OF NFIs';
--update brics_reg_data set EARLY_WARNING_AND_EARLY_ACTION_SYSTEM = true from brics_ags_lookup look where look.session_id = brics_reg_data.session_id and look.refined_ags = 'EARLY WARNING AND EARLY ACTION SYSTEM';
--update brics_reg_data set LIVELIHOOD_TRAINING = true from brics_ags_lookup look where look.session_id = brics_reg_data.session_id and look.refined_ags = 'LIVELIHOOD TRAINING';
--update brics_reg_data set LOBBYING_AND_ADVOCACY = true from brics_ags_lookup look where look.session_id = brics_reg_data.session_id and look.refined_ags = 'LOBBYING & ADVOCACY';
--update brics_reg_data set MARKET_ANALYSIS = true from brics_ags_lookup look where look.session_id = brics_reg_data.session_id and look.refined_ags = 'MARKET ANALYSIS';
--update brics_reg_data set NRM_TRAINING_AND_IMPLEMENTATION = true from brics_ags_lookup look where look.session_id = brics_reg_data.session_id and look.refined_ags = 'NRM TRAINING AND IMPLEMENTATION';
--update brics_reg_data set PEACE_BUILDING_TRAINING_AND_COMMITTEES = true from brics_ags_lookup look where look.session_id = brics_reg_data.session_id and look.refined_ags = 'PEACE BUILDING TRAINING AND COMMITTEES';
--update brics_reg_data set SELF_HELP_GROUPS_ESTABLISH_AND_TRAIN_AND_EQUIP = true from brics_ags_lookup look where look.session_id = brics_reg_data.session_id and look.refined_ags = 'SELF HELP GROUPS ESTABLISH AND TRAIN AND EQUIP';
--update brics_reg_data set WATER_ACCESS_AND_QUALITY_IMPROVEMENT = true from brics_ags_lookup look where look.session_id = brics_reg_data.session_id and look.refined_ags = 'WATER ACCESS AND QUALITY IMPROVEMENT';



alter table brics_ags_lookup add column CATEGORY_RESILIENCE BOOLEAN;
alter table brics_ags_lookup add column CATEGORY_WASH BOOLEAN;
alter table brics_ags_lookup add column CATEGORY_SHELTER BOOLEAN;
alter table brics_ags_lookup add column CATEGORY_FOOD_SECURITY_AND_LIVELIHOOD BOOLEAN;

UPDATE brics_ags_lookup SET CATEGORY_RESILIENCE = FALSE;
UPDATE brics_ags_lookup SET CATEGORY_WASH = FALSE;
UPDATE brics_ags_lookup SET CATEGORY_SHELTER = FALSE;
UPDATE brics_ags_lookup SET CATEGORY_FOOD_SECURITY_AND_LIVELIHOOD = FALSE;




UPDATE brics_reg_data set CATEGORY_RESILIENCE = true from refined_ags_output_lookup olook join brics_ags_lookup blook on blook.refined_ags = olook.refined_ags where blook.session_id = brics_reg_data.session_id and olook.output_id = 1
UPDATE brics_reg_data set CATEGORY_WASH = true from refined_ags_output_lookup olook join brics_ags_lookup blook on blook.refined_ags = olook.refined_ags where blook.session_id = brics_reg_data.session_id and olook.output_id = 2
UPDATE brics_reg_data set CATEGORY_SHELTER = true from refined_ags_output_lookup olook join brics_ags_lookup blook on blook.refined_ags = olook.refined_ags where blook.session_id = brics_reg_data.session_id and olook.output_id = 3
UPDATE brics_reg_data set CATEGORY_FOOD_SECURITY_AND_LIVELIHOOD = true from refined_ags_output_lookup olook join brics_ags_lookup blook on blook.refined_ags = olook.refined_ags where blook.session_id = brics_reg_data.session_id and olook.output_id = 4









