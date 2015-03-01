#cartodb



#brics_reg_data_2015_01_16 count of activity categories
select 
the_geom,district,
min(the_geom_webmercator) as the_geom_webmercator,
min(cartodb_id) as cartodb_id,
count (case when category_resilience = true then session_id else null end) as cat_res,
count (case when category_wash = true then session_id else null end) as cat_wash,
count (case when category_shelter = true then session_id else null end) as cat_hut,
count (case when category_food_security_and_livelihood = true then session_id else null end) as cat_food
from brics_reg_data_2015_01_16
group by 1,2;


select
the_geom,district,
min(the_geom_webmercator) as the_geom_webmercator,
min(cartodb_id) as cartodb_id,
count(case when CAMPAIGN_ANIMAL_TREATMENT = true then session_id else null end) as CAMPAIGN_ANIMAL_TREATMENT,
count(case when CAMPAIGN_IYCF_AWARENESS_TRAINING = true then session_id else null end) as CAMPAIGN_IYCF_AWARENESS_TRAINING,
count(case when CAMPAIGN_SANITATION_AND_WASH_AWARENESS = true then session_id else null end) as CAMPAIGN_SANITATION_AND_WASH_AWARENESS,
count(case when CASH_FOR_WORK = true then session_id else null end) as CASH_FOR_WORK,
count(case when CASH_GRANTS = true then session_id else null end) as CASH_GRANTS,
count(case when CASH_TRANSFERS_UNCONDITIONAL = true then session_id else null end) as CASH_TRANSFERS_UNCONDITIONAL,
count(case when CHWS_AND_HYGIENE_PROMOTERS_RECRUIT_AND_TRAIN = true then session_id else null end) as CHWS_AND_HYGIENE_PROMOTERS_RECRUIT_AND_TRAIN,
count(case when COMMUNITY_DISASTER_MANAGEMENT_COMMITTEES_CDMC_ESTABLISH_AND_TRAIN = true then session_id else null end) as COMMUNITY_DISASTER_MANAGEMENT_COMMITTEES_CDMC_ESTABLISH_AND_TRAIN,
count(case when COMMUNITY_PRODUCTIVE_ASSETS_BUILDING = true then session_id else null end) as COMMUNITY_PRODUCTIVE_ASSETS_BUILDING,
count(case when COMMUNITY_WASH_GROUPS_ESTABLISH_AND_TRAIN_AND_EQUIP = true then session_id else null end) as COMMUNITY_WASH_GROUPS_ESTABLISH_AND_TRAIN_AND_EQUIP,
count(case when CONSTRUCTION_AND_REHABILITATION_OF_PUBLIC_FACILITIES = true then session_id else null end) as CONSTRUCTION_AND_REHABILITATION_OF_PUBLIC_FACILITIES,
count(case when CONSTRUCTION_AND_REHABILITATION_OF_SHELTERS = true then session_id else null end) as CONSTRUCTION_AND_REHABILITATION_OF_SHELTERS,
count(case when CONSTRUCTION_AND_REHABILITATION_WATER_SOURCES_AND_RESERVOIRS = true then session_id else null end) as CONSTRUCTION_AND_REHABILITATION_WATER_SOURCES_AND_RESERVOIRS,
count(case when COUNSELLING_ON_GBV_AND_LINK_TO_SERVICE_PROVIDERS_FOR_VICTIMS = true then session_id else null end) as COUNSELLING_ON_GBV_AND_LINK_TO_SERVICE_PROVIDERS_FOR_VICTIMS,
count(case when DEVELOP_COMMUNITY_WATER_MANAGEMENT_PLANS = true then session_id else null end) as DEVELOP_COMMUNITY_WATER_MANAGEMENT_PLANS,
count(case when DEVELOP_SOLID_WASTE_MANAGEMENT_SYSTEM = true then session_id else null end) as DEVELOP_SOLID_WASTE_MANAGEMENT_SYSTEM,
count(case when DISTRIBUTION_OF_LIVELIHOOD_INPUTS = true then session_id else null end) as DISTRIBUTION_OF_LIVELIHOOD_INPUTS,
count(case when DISTRIBUTION_OF_NFIs = true then session_id else null end) as DISTRIBUTION_OF_NFIs,
count(case when EARLY_WARNING_AND_EARLY_ACTION_SYSTEM = true then session_id else null end) as EARLY_WARNING_AND_EARLY_ACTION_SYSTEM,
count(case when LIVELIHOOD_TRAINING = true then session_id else null end) as LIVELIHOOD_TRAINING,
count(case when LOBBYING_AND_ADVOCACY = true then session_id else null end) as LOBBYING_AND_ADVOCACY,
count(case when MARKET_ANALYSIS = true then session_id else null end) as MARKET_ANALYSIS,
count(case when NRM_TRAINING_AND_IMPLEMENTATION = true then session_id else null end) as NRM_TRAINING_AND_IMPLEMENTATION,
count(case when PEACE_BUILDING_TRAINING_AND_COMMITTEES = true then session_id else null end) as PEACE_BUILDING_TRAINING_AND_COMMITTEES,
count(case when SELF_HELP_GROUPS_ESTABLISH_AND_TRAIN_AND_EQUIP = true then session_id else null end) as SELF_HELP_GROUPS_ESTABLISH_AND_TRAIN_AND_EQUIP,
count(case when WATER_ACCESS_AND_QUALITY_IMPROVEMENT = true then session_id else null end) as WATER_ACCESS_AND_QUALITY_IMPROVEMENT
from brics_reg_data_2015_01_16
group by 1,2;







select 
district,array_agg(distinct ngo) as all_ngos,
min(the_geom_webmercator) as the_geom_webmercator,
min(cartodb_id) as cartodb_id,
sum(case
 when category_resilience is true then 1
 when category_wash is true then 1
 when category_shelter is true then 1
 when category_food_security_and_livelihood is true then 1
else 0 end)as total_activities
from brics_reg_data_2015_01_16
group by 1
order by 1;






