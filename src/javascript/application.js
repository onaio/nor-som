window.DFIDDashboard = Ember.Application.create();

DFIDDashboard.Dataset = Ember.Object.extend();
DFIDDashboard.Visualization = Ember.Object.extend({
    mapContainerID: Ember.computed('cartoVisualizationID', function() {
        return 'map-' + this.get('cartoVisualizationID');
    }),
});

DFIDDashboard.sql = new cartodb.SQL({user: 'ona', api_key: '71318d1aefad674aeeeda099af88240beb003209'});

DFIDDashboard.visualizations = [
    DFIDDashboard.Visualization.create({
        datasetSlug: 'brics',
        title: 'Activity Groups by District',
        id: 'activity-groups-by-district',
        query: "select " +
                "the_geom, " +
                "min(district) as district, " +
                "min(the_geom_webmercator) as the_geom_webmercator, " +
                "min(cartodb_id) as cartodb_id, " +
                "count (case when category_resilience = true then session_id else null end) as resilience, " +
                "count (case when category_wash = true then session_id else null end) as wash, " +
                "count (case when category_shelter = true then session_id else null end) as shelter, " +
                "count (case when category_food_security_and_livelihood = true then session_id else null end) as food " +
                "from brics_reg_data_2015_01_16 " +
                "group by 1",
        cartoVisualizationID: '2b5caab4-7af9-11e4-bfdf-0e853d047bba',
        categorizedBy: 'district',
        columnNames: ['shelter', 'wash', 'resilience', 'food'],
        rawData: []
    }),
    DFIDDashboard.Visualization.create({
        datasetSlug: 'brics',
        title: 'Activity Groups by NGO',
        id: 'activity-groups-by-ngo',
        query:  "select  " +
                "ngo, " +
                "count (case when category_resilience = true then session_id else null end) as resilience, " +
                "count (case when category_wash = true then session_id else null end) as wash, " +
                "count (case when category_shelter = true then session_id else null end) as shelter, " +
                "count (case when category_food_security_and_livelihood = true then session_id else null end) as food " +
                "from brics_reg_data_2015_01_16 " +
                "group by 1",
        cartoVisualizationID: 'c9320b96-7caa-11e4-a351-0e853d047bba',
        categorizedBy: 'ngo',
        columnNames: ['resilience', 'wash', 'shelter', 'food'],
        rawData: []
    }),
    DFIDDashboard.Visualization.create({
        datasetSlug: 'unicef',
        title: 'Total PCAS by Programme',
        id: 'total-pcas-by-programme',
        query: "select  " +
                "programme_section, " +
                "sum(total_pca_value) total_pca, " +
                "sum(unicef_cash + unicef_supply) as unicef_contribution, " +
                "sum(partner_contribution) total_partner_contribution, " +
                "count (1) as num_pcas " +
                "FROM unicef_active_pcas " +
                "group by 1",
        cartoVisualizationID: '8adc94f2-be35-11e4-a9de-0e0c41326911',
        categorizedBy: 'programme_section',
        columnNames: ['unicef_contribution', 'total_partner_contribution'],
        rawData: []
    }),
];

DFIDDashboard.datasets = [
    {
        organizationSlug: 'brics',
        name: 'BRiCS',
        slug: 'brics',
        cartoVisualizationID: '8adc94f2-be35-11e4-a9de-0e0c41326911',
        rawData: [],
        visualizations: DFIDDashboard.visualizations
                        .filter(function(item) { return item.datasetSlug == 'brics'; })
                        .map(function(item) { return item; })
    },
    {
        organizationSlug: 'unicef',
        name: 'UNICEF',
        slug: 'unicef',
        rawData: [],
        visualizations: DFIDDashboard.visualizations
                        .filter(function(item) { return item.datasetSlug == 'unicef'; })
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
    },
    {
        name: 'UNICEF',
        slug: 'unicef',
        datasets: DFIDDashboard.datasets.filter(function(item) { return item.organizationSlug == 'unicef'; })
    },
];

DFIDDashboard.StandaloneWidgetComponent = Ember.Component.extend({
    visualization: Ember.computed('visualizationID', function() {
        var visualizationID = this.get('visualizationID');
        console.log(visualizationID);
        var visualization = DFIDDashboard.visualizations.filter(function(item) {
            return (item.id == visualizationID);
        })[0];
        console.log(visualization.chartData);
        return visualization;
    }),
});

DFIDDashboard.StandaloneChartComponent = DFIDDashboard.StandaloneWidgetComponent.extend({});
DFIDDashboard.StandaloneMapComponent = DFIDDashboard.StandaloneWidgetComponent.extend({});
