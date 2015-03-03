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
        datasetSlug: 'brics',
        title: 'All NGO Activitities (BRiCS) by District',
        id: 'activity-groups-by-districts-all-ngos',
        query:  "select " + 
                "district,array_agg(distinct ngo) as all_ngos, " + 
                "min(the_geom_webmercator) as the_geom_webmercator, " + 
                "min(cartodb_id) as cartodb_id, " + 
                "sum(case " + 
                "when category_resilience is true then 1 " + 
                "when category_wash is true then 1 " + 
                "when category_shelter is true then 1 " + 
                "when category_food_security_and_livelihood is true then 1 " + 
                "else 0 end)as total_activities " +
                "from brics_reg_data_2015_01_16 " + 
                "group by 1 " +
                "order by 1 ",
        //cartoVisualizationID: 'c9320b96-7caa-11e4-a351-0e853d047bba',
        categorizedBy: 'district',
        columnNames: ['total_activities'],
        rawData: []
    }),
    DFIDDashboard.Visualization.create({
        datasetSlug: 'unicef',
        title: 'Total PCAS by Programme',
        id: 'total-pcas-by-programme',
        query:  "SELECT " +
                "programme_section, " +
                "SUM(unicef_contribution::numeric) as unicef_contribution, " +
                "SUM(partner_contribution::numeric) as total_partner_contribution, " +
                "SUM(total_pca_value::numeric) as total_pca_value, " +
                "COUNT (*) AS num_pcas, " +
                "(SUM(total_pca_value::numeric)/count(*))::numeric AS avg_per_pca " +
                "FROM unicef_active_pcas " +
                "GROUP by 1",
        cartoVisualizationID: '8adc94f2-be35-11e4-a9de-0e0c41326911',
        categorizedBy: 'programme_section',
        columnNames: ['unicef_contribution', 'total_partner_contribution'],
        rawData: []
    })
];

DFIDDashboard.datasets = [
    {
        organizationSlug: 'overview',
        name: 'Overview',
        slug: 'overview',
        rawData: [],
        visualizations: DFIDDashboard.visualizations
                        .filter(function(item) { return item.datasetSlug == 'overview'; })
                        .map(function(item) { return item; })
    },
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
        organizationSlug: 'sns',
        name: 'SNS',
        slug: 'sns',
        cartoVisualizationID: '8adc94f2-be35-11e4-a9de-0e0c41326911',
        rawData: [],
        visualizations: DFIDDashboard.visualizations
                        .filter(function(item) { return item.datasetSlug == 'sns'; })
                        .map(function(item) { return item; })
    },
    {
        organizationSlug: 'fao',
        name: 'FAO',
        slug: 'fao',
        rawData: [],
        visualizations: DFIDDashboard.visualizations
                        .filter(function(item) { return item.datasetSlug == 'fao'; })
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
    },    
    {
        organizationSlug: 'wfp',
        name: 'WFP',
        slug: 'wfp',
        rawData: [],
        visualizations: DFIDDashboard.visualizations
                        .filter(function(item) { return item.datasetSlug == 'wfp'; })
                        .map(function(item) { return item; })
    },

];

DFIDDashboard.organizations = [
    {
        name: 'Overview',
        slug: 'overview',
        datasets: DFIDDashboard.datasets.filter(function(item) { return item.organizationSlug == 'overview'; })

    },
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
    {
        name: 'WFP',
        slug: 'wfp',
        datasets: DFIDDashboard.datasets.filter(function(item) { return item.organizationSlug == 'wfp'; })
    }

];

DFIDDashboard.StandaloneWidgetComponent = Ember.Component.extend({
    visualization: Ember.computed('visualizationID', function() {
        var visualizationID = this.get('visualizationID');
        var visualization = DFIDDashboard.visualizations.filter(function(item) {
            return (item.id == visualizationID);
        })[0];
        return visualization;
    }),
});

DFIDDashboard.StandaloneChartComponent = DFIDDashboard.StandaloneWidgetComponent.extend({});
DFIDDashboard.StandaloneMapComponent = DFIDDashboard.StandaloneWidgetComponent.extend({});
DFIDDashboard.StandaloneTableComponent = DFIDDashboard.StandaloneWidgetComponent.extend({
    tableColumns: Ember.computed('visualization.rawData', function() {
        var visualization = this.get('visualization');
        if(!visualization) { return []; }
        console.log("Visualization", visualization);
        var rawData = visualization.get('rawData');
        console.log("Raw", rawData);
        var headings = []
        if(rawData[0]) { headings = Object.keys(rawData[0]) };
        var columns = headings.map(function(entry) {
            var columnDefinition = Ember.Table.ColumnDefinition.create({
                headerCellName: entry,
                textAlign: 'text-align-left',
                contentPath: entry
            });
            return columnDefinition;
        });
        return columns;
    }),
    tableContents: Ember.computed('columns', function() {
        var keys = this.get('columns');
        var rows = this.get('visualization').rawData.map(function(row) {
            var values = [];
            for(var index in keys) {
                var key = keys[index];
                if(row.hasOwnProperty(key)) {
                    values.push(row[key]);
                }
            }
            return values;
        });
        return rows;
    }),
});
