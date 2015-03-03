window.DFIDDashboard = Ember.Application.create();

DFIDDashboard.Dataset = Ember.Object.extend();
DFIDDashboard.Visualization = Ember.Object.extend({
    mapContainerID: Ember.computed('cartoVisualizationID', function() {
        return 'map-' + this.get('cartoVisualizationID');
    }),
});
DFIDDashboard.VisualizationGroup = Ember.Object.extend();

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
    }),
    DFIDDashboard.Visualization.create({
        datasetSlug: 'fao',
        title: 'FAO Cash-for-Work Beneficiary Registration',
        id: 'fao-cfw-beneficiary-reg',
        query:  "SELECT " +
                "district, " +
                "ngo, " +
                "SUM(total_beneficiaries) AS total_beneficiaries, " +
                "SUM(total_hhs) AS total_hhs " +
                "FROM fao_cfw_beneficiary_reg " +
                "GROUP by 1, 2",
        cartoVisualizationID: 'bb3e8a18-c16b-11e4-8b88-0e9d821ea90d',
        categorizedBy: 'district',
        columnNames: ['total_beneficiaries'],
        rawData: []
    }),
    DFIDDashboard.Visualization.create({
        datasetSlug: 'sns',
        title: 'SNS Scored CSI',
        id: 'sns-scored-csi',
        query:  "SELECT district, " +
                "AVG(reduced_csi)::numeric(10,0) AS csi " +
                "FROM sns_scored " +
                "GROUP by 1 " +
                "ORDER by 1",
        categorizedBy: 'district',
        columnNames: ['csi'],
        rawData: []
    }),
    DFIDDashboard.Visualization.create({
        datasetSlug: 'sns',
        title: 'SNS Scored HDDS',
        id: 'sns-scored-hdds',
        query:  "SELECT district, " +
                "AVG(mhdds)::numeric(10,0)as hdds " +
                "FROM sns_scored " +
                "GROUP by 1 " +
                "ORDER by 1",
        categorizedBy: 'district',
        columnNames: ['hdds'],
        rawData: []
    }),
    DFIDDashboard.Visualization.create({
        datasetSlug: 'sns',
        title: 'SNS Scored CSI',
        id: 'sns-scored-assets',
        query:  "SELECT district, " +
                "AVG(total_asset)::numeric(10,0) as assets " +
                "FROM sns_scored " +
                "GROUP by 1 " +
                "ORDER by 1",
        categorizedBy: 'district',
        columnNames: ['assets'],
        rawData: []
    }),
    DFIDDashboard.Visualization.create({
        datasetSlug: 'sns',
        title: 'SNS Scored CSI',
        id: 'sns-scored-fcs',
        query:  "SELECT " +
                "DISTRICT, " +
                "COUNT(case when total_fcs::numeric(10,0)>35 then recordid else null end) as acceptable, " +
                "COUNT(case when total_fcs::numeric(10,0)<=35 and total_fcs::numeric(10,0)>21 then recordid else null end) as borderline, " +
                "COUNT(case when total_fcs::numeric(10,0)<=21 then recordid else null end) as poor " +
                "FROM sns_scored " +
                "GROUP by 1 " +
                "ORDER by 1",
        categorizedBy: 'district',
        columnNames: ['acceptable', 'borderline', 'poor'],
        rawData: []
    }),
    DFIDDashboard.Visualization.create({
        datasetSlug: 'sns',
        title: 'Indicator Averages by NGO',
        id: 'sns-indicator-averages-by-ngo',
        query:  "SELECT " +
                "UPPER(ngo) as ngo, " +
                "AVG(reduced_csi)::numeric(10,0) AS csi, " +
                "AVG(mhdds)::numeric(10,0) AS hdds, " +
                "AVG(total_asset)::numeric(10,0) AS assets, " +
                "AVG(total_fcs)::numeric(10,0) AS fcs " +
                "FROM sns_scored " +
                "GROUP by 1 " +
                "ORDER by 1",
        categorizedBy: 'district',
        columnNames: ['fcs'],
        rawData: []
    }),
    DFIDDashboard.Visualization.create({
        datasetSlug: 'unicef',
        title: 'UNICEF Cash Transfers Beneficiary',
        id: 'unicef-cash-transfers',
        query:  "SELECT " +
                "the_geom, " +
                "min(district) as district, " +
                "min(the_geom_webmercator) as the_geom_webmercator, " +
                "min(cartodb_id) as cartodb_id, " +
                "sum(number_of_individuals) as beneficiaries, " +
                "sum(number_of_hhs) as hhs " +
                "FROM unicef_cash_transfers " +
                "group by 1 ",
        cartoVisualizationID: '8adc94f2-be35-11e4-a9de-0e0c41326911',
        categorizedBy: 'district',
        columnNames: ['beneficiaries'],
        rawData: []
    })
];

DFIDDashboard.visualizationGroups = [
    DFIDDashboard.VisualizationGroup.create({
        id: 'hdds-csi',
        datasetSlug: 'sns',
        visualizationIDs: ['sns-scored-csi', 'sns-scored-hdds'],
    }),
]

DFIDDashboard.organizations = [
    {
        name: 'Overview',
        slug: 'overview',
        rawData: [],
        visualizationGroups: DFIDDashboard.visualizationGroups
                        .filter(function(item) { return item.datasetSlug == 'overview'; }),
        visualizations: DFIDDashboard.visualizations
                        .filter(function(item) { return item.datasetSlug == 'overview'; })
                        .map(function(item) { return item; })
    },
    {
        name: 'BRiCS',
        slug: 'brics',
        cartoVisualizationID: '8adc94f2-be35-11e4-a9de-0e0c41326911',
        rawData: [],
        visualizationGroups: DFIDDashboard.visualizationGroups
                        .filter(function(item) { return item.datasetSlug == 'brics'; }),
        visualizations: DFIDDashboard.visualizations
                        .filter(function(item) { return item.datasetSlug == 'brics'; })
                        .map(function(item) { return item; })
    },
    {
        name: 'SNS',
        slug: 'sns',
        cartoVisualizationID: '8adc94f2-be35-11e4-a9de-0e0c41326911',
        rawData: [],
        visualizationGroups: DFIDDashboard.visualizationGroups
                        .filter(function(item) { return item.datasetSlug == 'sns'; }),
        visualizations: DFIDDashboard.visualizations
                        .filter(function(item) { return item.datasetSlug == 'sns'; })
                        .map(function(item) { return item; })
    },
    {
        name: 'FAO',
        slug: 'fao',
        rawData: [],
        visualizationGroups: DFIDDashboard.visualizationGroups
                        .filter(function(item) { return item.datasetSlug == 'fao'; }),
        visualizations: DFIDDashboard.visualizations
                        .filter(function(item) { return item.datasetSlug == 'fao'; })
                        .map(function(item) { return item; })
    },
    {
        name: 'UNICEF',
        slug: 'unicef',
        rawData: [],
        visualizationGroups: DFIDDashboard.visualizationGroups
                        .filter(function(item) { return item.datasetSlug == 'unicef'; }),
        visualizations: DFIDDashboard.visualizations
                        .filter(function(item) { return item.datasetSlug == 'unicef'; })
                        .map(function(item) { return item; })
    },    
    {
        name: 'WFP',
        slug: 'wfp',
        rawData: [],
        visualizationGroups: DFIDDashboard.visualizationGroups
                        .filter(function(item) { return item.datasetSlug == 'wfp'; })
        visualizations: DFIDDashboard.visualizations
                        .filter(function(item) { return item.datasetSlug == 'wfp'; })
                        .map(function(item) { return item; })
    },

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

DFIDDashboard.ChartGroupComponent = Ember.Component.extend({
    visualizations: Ember.computed('visualizationGroupID', function() {
        console.log("Visualization ID", this.get('visualizationGroupID'));
        var visualizationGroupID = this.get('visualizationGroupID');
        var visualizationGroup = DFIDDashboard.visualizationGroups.filter(function(item) {
            return item.id == visualizationGroupID;
        })[0];
        console.log("Group", visualizationGroup);
        var visualizations = DFIDDashboard.visualizations.filter(function(item) {
            return visualizationGroup.visualizationIDs.indexOf(item.id) != -1;
        });
        console.log("Visualizations", visualizations);
        return visualizations;
    })
});

$('body').on('shown.bs.tab', 'a[data-toggle="tab"]', function (e) {
    $('body').resize();
});
