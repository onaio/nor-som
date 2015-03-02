###BRICS

/*
create table brics_community_plans(
activity_group_code int,
region varchar(15),
district varchar(15),
community varchar(40),
ngo varchar(15),
hazard varchar(25),
activities varchar(150),
number_of_activities_or_unites varchar(50),
beneficiaries_per_activity int,
budget__usd int,
brics_output varchar(3),
_2014_quarter_3 boolean,
_2014_quarter_4 boolean,
_2015_quarter_1 boolean,
_2015_quarter_2 boolean,
_2015_quarter_3 boolean,
_2015_quarter_4 boolean,
_2016 boolean,
_2017 boolean);
*/

select 
count(distinct activity_group_code) as activity_group_code,
count(distinct region) as region,
count(distinct district) as district,
count(distinct community) as community,
count(distinct ngo) as ngo,
count(distinct hazard) as hazard,
count(distinct activities) as activities,
count(distinct number_of_activities_or_unites) as number_of_activities_or_unites,
count(distinct beneficiaries_per_activity) as beneficiaries_per_activity,
count(distinct budget__usd) as budget__usd,
count(distinct brics_output) as brics_output,
count(distinct _2014_quarter_3) as _2014_quarter_3,
count(distinct _2014_quarter_4) as _2014_quarter_4,
count(distinct _2015_quarter_1) as _2015_quarter_1,
count(distinct _2015_quarter_2) as _2015_quarter_2,
count(distinct _2015_quarter_3) as _2015_quarter_3,
count(distinct _2015_quarter_4) as _2015_quarter_4,
count(distinct _2016) as _2016,
count(distinct _2017) as _2017s
from brics_community_plans;



update brics_community_plans
set district_id = dl.district_id
from district_lookup dl
where brics_community_plans.district = dl.district_name;

update brics_community_plans
set district_id = dl.district_id
from district_lookup dl
where brics_community_plans.district = dl.district_alt and 
        brics_community_plans.district_id is null;

##

#village_lookup

SELECT REGION,DISTRICT,VILLAGE,
        AVG(LATITUDE),AVG(LATITUDE)-min(latitude),max(latitude)-AVG(LATITUDE),
        AVG(LONGITUDE),AVG(LONGITUDE)-min(longitude),max(longitude)-AVG(LONGITUDE),
        DISTRICT_ID
FROM VILLAGE
GROUP BY 1,2,3,10;

select region,district,village,
avg(village.latitude) as latitude,
avg(village.longitude) as longitude,
district_id
into village_avg
from village
group by 1,2,3,6;

####