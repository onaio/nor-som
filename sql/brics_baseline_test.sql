## this is to test that uploading columns 'the_geom','area' (ie shapefiles/polygons) exported 
## from a different cartodb table will work if they are added to a file that is synced with google drive

### result: yes, it works and renders properly with the mapping however carto doesn't seem to recognize the column
### as 'geo' so there may be bugs that have yet to be discovered
create table brics_baseline_test as
select * from brics_beneficiary_baseline

alter table brics_baseline_test add column the_geom varchar(13000);
alter table brics_baseline_test add column area float;

update brics_baseline_test set the_geom = dg.the_geom
from district_geo dg
where dg.district_id = brics_baseline_test.district_id;

update brics_baseline_test set area = dg.area
from district_geo dg
where dg.district_id = brics_baseline_test.district_id;

select count(*) as total,
count(case when the_geom is null then id end)as _null,
count(case when the_geom is not null then id end)as _notnull
FROM brics_baseline_test;


select
b.district_id,dl.district_name,dl.region_name,dl.region_id
from brics_baseline_test b
left join district_lookup dl on dl.district_id = b.district_id
where b.the_geom is null
group by 1,2,3,4 order by 3;

select 
count(distinct district_name) 
from district_lookup;



alter table brics_baseline_test drop column the_geom;

select count(distinct region),count(distinct district) 
from brics_baseline_test where the_geom is null;