create table refined_ags_output_lookup(
refined_ags varchar(80),
output_id int,
output_name varchar(40));

copy refined_ags_output_lookup from '/users/elliottwilkes/dfid-dash/data/refined_ags_output_lookup.csv' CSV header;



