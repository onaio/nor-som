window.DFIDDashboard = Ember.Application.create();

DFIDDashboard.Dataset = Ember.Object.extend();
DFIDDashboard.Visualization = Ember.Object.extend();

DFIDDashboard.sql = new cartodb.SQL({user: 'ona', api_key: '71318d1aefad674aeeeda099af88240beb003209'});

DFIDDashboard.visualizations = [
    DFIDDashboard.Visualization.create({
        datasetSlug: 'brics-registration-data',
        title: 'Activity Groups by District',
        id: 'activity-groups-by-district',
        query: "select \
                the_geom, \
                min(district) as district,\
                min(the_geom_webmercator) as the_geom_webmercator,\
                min(cartodb_id) as cartodb_id,\
                count (case when category_resilience = true then session_id else null end) as resilience,\
                count (case when category_wash = true then session_id else null end) as wash,\
                count (case when category_shelter = true then session_id else null end) as shelter,\
                count (case when category_food_security_and_livelihood = true then session_id else null end) as food\
                from brics_reg_data_2015_01_16\
                group by 1",
        cartoVisualizationID: '2b5caab4-7af9-11e4-bfdf-0e853d047bba',
        categorizedBy: 'district',
        columnNames: ['resilience', 'wash', 'shelter', 'food'],
        mapContainerID: 'map-2b5caab4-7af9-11e4-bfdf-0e853d047bba',
        rawData: []
    }),
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
                        .map(function(item) { return item; })
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
                        .map(function(item) { return item; })
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

DFIDDashboard.StandaloneWidgetComponent = Ember.Component.extend({
    visualization: Ember.computed('visualizationID', function() {
        var visualizationID = this.get('visualizationID');
        console.log(visualizationID);
        var visualization = DFIDDashboard.visualizations.filter(function(item) {
            return (item.id == visualizationID);
        })[0];
        console.log(visualization);
        return visualization;
    }),
});

DFIDDashboard.StandaloneChartComponent = DFIDDashboard.StandaloneWidgetComponent.extend({})
DFIDDashboard.StandaloneMapComponent = DFIDDashboard.StandaloneWidgetComponent.extend({})
