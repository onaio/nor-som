window.DFIDDashboard = Ember.Application.create();

DFIDDashboard.Dataset = Ember.Object.extend();
DFIDDashboard.Visualization = Ember.Object.extend();

DFIDDashboard.sql = new cartodb.SQL({user: 'ona', api_key: '71318d1aefad674aeeeda099af88240beb003209'});

DFIDDashboard.visualizations = [
    {
        datasetSlug: 'brics-registration-data',
        title: 'Residential Status Information',
        query: "select hh_info_residential_status, count(hh_info_residential_status) from brics_reg_data_2015_01_16 group by 1 order by 2 desc;",
        rawData: []
    },
    {
        datasetSlug: 'brics-registration-data',
        title: 'Shelter Groups',
        query: "select shelter_groups, count(shelter_groups)  from brics_reg_data_2015_01_16 where shelter_groups is not null group by 1 order by 2 desc;",
        rawData: [],
    },
    {
        datasetSlug: 'brics-registration-data',
        title: 'Main Income Groups',
        query: "select main_income_groups, count(main_income_groups) from brics_reg_data_2015_01_16  group by 1 order by 2 desc;",
        rawData: [],
    }
];

DFIDDashboard.datasets = [
    {
        organizationSlug: 'brics',
        name: 'BRiCS Community Plans',
        slug: 'brics-community-plans',
        cartoVisualizationID: 'c15061cc-bb3c-11e4-a7da-0e9d821ea90d',
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
