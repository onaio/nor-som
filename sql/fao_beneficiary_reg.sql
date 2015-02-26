###FAO

/*
create table fao_beneficiary_reg (
Data_Entry_Number varchar(30),
User_Full_Names varchar(30),
User_Email_Address varchar(30),
Date_Created date,
Time_Created time,
District varchar(30),
Main_Village varchar(30),
Infrastructure_Name varchar(40),
Pay_Location varchar(30),
NGO varchar(30),
Date date,
Staff_Name varchar(60),
Mobile varchar(40),
Travel_time_to_Pay_Location_ varchar(5),
Beneficiary varchar(30),
HH_Worker_Name varchar(60),
Beneficiary_Type varchar(10),
Gender varchar(10),
Age int,
Head_of_Household_Gender varchar(10),
Head_of_Household_Age varchar(10),
Size_of_HH int,
num_Children_over_14_years int,
Status varchar(10),
Beneficiary_telephone_number varchar(15),
Thumbprint_only_if_not_using_Biometrics varchar(3));
*/


select pay_location,
count(pay_location) 
from fao_beneficiary_reg
group by 1 order by 1;


update fao_beneficiary_reg
set district_id = dl.district_id
from district_lookup dl
where fao_beneficiary_reg.district = dl.district_name;

update fao_beneficiary_reg
set district_id = dl.district_id
from district_lookup dl
where fao_beneficiary_reg.district = dl.district_alt and 
        fao_beneficiary_reg.district_id is null;

select distinct district from fao_beneficiary_reg where district_id is null;


select 
count(distinct data_entry_number) as data_entry_number,
count(distinct user_full_names) as user_full_names,
count(distinct user_email_address) as user_email_address,
count(distinct date_created) as date_created,
count(distinct time_created) as time_created,
count(distinct district) as district,
count(distinct main_village) as main_village,
count(distinct infrastructure_name) as infrastructure_name,
count(distinct pay_location) as pay_location,
count(distinct ngo) as ngo,
count(distinct date) as date,
count(distinct staff_name) as staff_name,
count(distinct mobile) as mobile,
count(distinct travel_time_to_pay_location_) as travel_time_to_pay_location_,
count(distinct beneficiary) as beneficiary,
count(distinct hh_worker_name) as hh_worker_name,
count(distinct beneficiary_type) as beneficiary_type,
count(distinct gender) as gender,
count(distinct age) as age,
count(distinct head_of_household_gender) as head_of_household_gender,
count(distinct head_of_household_age) as head_of_household_age,
count(distinct size_of_hh) as size_of_hh,
count(distinct num_children_over_14_years) as num_children_over_14_years,
count(distinct status) as status,
count(distinct beneficiary_telephone_number) as beneficiary_telephone_number,
count(distinct thumbprint_only_if_not_using_biometrics) as thumbprint_only_if_not_using_biometrics,
count(distinct district_id) as district_id 
from fao_beneficiary_reg;



select 
count(distinct data_entry_number) as data_entry_number,
count(distinct user_full_names) as user_full_names,
count(distinct user_email_address) as user_email_address,
count(distinct date_created) as date_created,
count(distinct time_created) as time_created,
count(distinct district) as district,
count(distinct main_village) as main_village,
count(distinct infrastructure_name) as infrastructure_name,
count(distinct pay_location) as pay_location,
count(distinct ngo) as ngo,
count(distinct date) as date,
count(distinct staff_name) as staff_name,
count(distinct mobile) as mobile,
count(distinct travel_time_to_pay_location_) as travel_time_to_pay_location_,
count(distinct beneficiary) as beneficiary,
count(distinct hh_worker_name) as hh_worker_name,
count(distinct beneficiary_type) as beneficiary_type,
count(distinct gender) as gender,
count(distinct age) as age,
count(distinct head_of_household_gender) as head_of_household_gender,
count(distinct head_of_household_age) as head_of_household_age,
count(distinct size_of_hh) as size_of_hh,
count(distinct num_children_over_14_years) as num_children_over_14_years,
count(distinct status) as status,
count(distinct beneficiary_telephone_number) as beneficiary_telephone_number,
count(distinct thumbprint_only_if_not_using_biometrics) as thumbprint_only_if_not_using_biometrics,
count(distinct district_id) as district_id 
from fao_beneficiary_reg
;


select 
sum(case when data_entry_number is null or data_entry_number = '' then 1 else 0 end) as data_entry_number,
sum(case when user_full_names is null or user_full_names = '' then 1 else 0 end) as user_full_names,
sum(case when user_email_address is null or user_email_address = '' then 1 else 0 end) as user_email_address,
sum(case when date_created is null or date_created = '' then 1 else 0 end) as date_created,
sum(case when time_created is null or time_created = '' then 1 else 0 end) as time_created,
sum(case when district is null or district = '' then 1 else 0 end) as district,
sum(case when main_village is null or main_village = '' then 1 else 0 end) as main_village,
sum(case when infrastructure_name is null or infrastructure_name = '' then 1 else 0 end) as infrastructure_name,
sum(case when pay_location is null or pay_location = '' then 1 else 0 end) as pay_location,
sum(case when ngo is null or ngo = '' then 1 else 0 end) as ngo,
sum(case when _date is null or _date = '' then 1 else 0 end) as _date,
sum(case when staff_name is null or staff_name = '' then 1 else 0 end) as staff_name,
sum(case when mobile is null or mobile = '' then 1 else 0 end) as mobile,
sum(case when travel_time_to_pay_location_ is null or travel_time_to_pay_location_ = '' then 1 else 0 end) as travel_time_to_pay_location_,
sum(case when beneficiary is null or beneficiary = '' then 1 else 0 end) as beneficiary,
sum(case when hh_worker_name is null or hh_worker_name = '' then 1 else 0 end) as hh_worker_name,
sum(case when beneficiary_type is null or beneficiary_type = '' then 1 else 0 end) as beneficiary_type,
sum(case when gender is null or gender = '' then 1 else 0 end) as gender,
sum(case when age is null or age = '' then 1 else 0 end) as age,
sum(case when head_of_household_gender is null or head_of_household_gender = '' then 1 else 0 end) as head_of_household_gender,
sum(case when head_of_household_age is null or head_of_household_age = '' then 1 else 0 end) as head_of_household_age,
sum(case when size_of_hh is null or size_of_hh = '' then 1 else 0 end) as size_of_hh,
sum(case when num_children_over_14_years is null or num_children_over_14_years = '' then 1 else 0 end) as num_children_over_14_years,
sum(case when status is null or status = '' then 1 else 0 end) as status,
sum(case when beneficiary_telephone_number is null or beneficiary_telephone_number = '' then 1 else 0 end) as beneficiary_telephone_number,
sum(case when thumbprint_only_if_not_using_biometrics is null or thumbprint_only_if_not_using_biometrics = '' then 1 else 0 end) as thumbprint_only_if_not_using_biometrics,
sum(case when district_id is null or district_id = '' then 1 else 0 end) as district_id
from fao_beneficiary_reg;




--#unique records
select count(distinct hh_worker_name||data_entry_number||beneficiary) 
from fao_beneficiary_reg;
##









