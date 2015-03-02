window.DFIDDashboard = Ember.Application.create();

DFIDDashboard.Dataset = Ember.Object.extend();
DFIDDashboard.Visualization = Ember.Object.extend();

DFIDDashboard.sql = new cartodb.SQL({user: 'ona', api_key: '71318d1aefad674aeeeda099af88240beb003209'});

DFIDDashboard.visualizations = [
    {
        datasetSlug: 'brics-registration-data',
        title: 'Activity Groups by District',
        query: "select \
                the_geom, \
                min(district) as district,\
                min(the_geom_webmercator) as the_geom_webmercator,\
                min(cartodb_id) as cartodb_id,\
                count (case when category_resilience = true then session_id else null end) as cat_res,\
                count (case when category_wash = true then session_id else null end) as cat_wash,\
                count (case when category_shelter = true then session_id else null end) as cat_hut,\
                count (case when category_food_security_and_livelihood = true then session_id else null end) as cat_food\
                from brics_reg_data_2015_01_16\
                group by 1",
        cartoVisualizationID: '2b5caab4-7af9-11e4-bfdf-0e853d047bba',
        categorizedBy: 'district',
        columnNames: ['cat_res', 'cat_wash', 'cat_hut', 'cat_food'],
        mapContainerID: 'map-2b5caab4-7af9-11e4-bfdf-0e853d047bba',
        rawData: []
    },
    {
        datasetSlug: 'brics-registration-data',
        title: 'Activity Groups by NGO',
        query:  "select \
                ngo,\
                count (case when category_resilience = true then session_id else null end) as cat_res,\
                count (case when category_wash = true then session_id else null end) as cat_wash,\
                count (case when category_shelter = true then session_id else null end) as cat_hut,\
                count (case when category_food_security_and_livelihood = true then session_id else null end) as cat_food\
                from brics_reg_data_2015_01_16\
                group by 1",
        cartoVisualizationID: 'c9320b96-7caa-11e4-a351-0e853d047bba',
        categorizedBy: 'ngo',
        columnNames: ['cat_res', 'cat_wash', 'cat_hut', 'cat_food'],
        mapContainerID: 'map-c9320b96-7caa-11e4-a351-0e853d047bba',
        rawData: []
    },
];

DFIDDashboard.datasets = [
    {
        organizationSlug: 'brics',
        name: 'BRiCS Community Plans',
        slug: 'brics-community-plans',
        cartoTableName: 'brics_community_plans_final',
        rawData: [],
        visualizations: DFIDDashboard.visualizations
                        .filter(function(item) { return item.datasetSlug == 'brics-community-plans'; })
                        .map(function(item) { return DFIDDashboard.Visualization.create(item); })
    },
    {
        organizationSlug: 'brics',
        name: 'BRiCS Registration Data',
        slug: 'brics-registration-data',
        cartoVisualizationID: '8adc94f2-be35-11e4-a9de-0e0c41326911',
        cartoTableName: 'brics_reg_data_2015_01_16',
        rawData: [],
        visualizations: DFIDDashboard.visualizations
                        .filter(function(item) { return item.datasetSlug == 'brics-registration-data'; })
                        .map(function(item) { return DFIDDashboard.Visualization.create(item); })
    }
];

DFIDDashboard.organizations = [
    {
        name: 'BRiCS',
        slug: 'brics',
        datasets: DFIDDashboard.datasets.filter(function(item) { return item.organizationSlug == 'brics'; })

    },
    {
        name: 'SNS',
        slug: 'sns',
        datasets: DFIDDashboard.datasets.filter(function(item) { return item.organizationSlug == 'sns'; })
    },
    {
        name: 'FAO',
        slug: 'fao',
        datasets: DFIDDashboard.datasets.filter(function(item) { return item.organizationSlug == 'fao'; })
    }
];
