window.DFIDDashboard = Ember.Application.create();

DFIDDashboard.Visualization = Ember.Object.extend({
    mapContainerID: Ember.computed('cartoVisualizationID', function() {
        return 'map-' + this.get('cartoVisualizationID');
    }),
});
DFIDDashboard.VisualizationGroup = Ember.Object.extend();

DFIDDashboard.sql = new cartodb.SQL({user: 'ona', api_key: '71318d1aefad674aeeeda099af88240beb003209'});

DFIDDashboard.visualizations = [
    DFIDDashboard.Visualization.create({
        organizationSlugs: ['brics'],
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
        organizationSlugs: ['brics'],
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
        organizationSlugs: ['brics'],
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
        organizationSlugs: ['unicef'],
        title: 'Total Budgets of PCAs by Programme (1M USD)',
        id: 'unicef-total-pca-budget-by-programme',
        query:  "SELECT " +
                "programme_section, " +
                "((SUM(unicef_contribution::numeric)/1000000)) as unicef_contribution, " +
                "((SUM(partner_contribution::numeric)/1000000)) as partner_contribution, " +
                "((SUM(total_pca_value::numeric)/1000000)) as total_pca_value, " +
                "COUNT (*) AS num_pcas, " +
                "(SUM(total_pca_value::numeric)/count(*))::numeric AS avg_per_pca " +
                "FROM unicef_active_pcas " +
                "GROUP by 1",
        cartoVisualizationID: '8adc94f2-be35-11e4-a9de-0e0c41326911',
        categorizedBy: 'programme_section',
        columnNames: ['unicef_contribution', 'partner_contribution'],
        rawData: []
    }),
    DFIDDashboard.Visualization.create({
        organizationSlugs: ['unicef'],
        title: 'Total PCA Budgets by Partner (100K USD)',
        id: 'unicef-total-pca-budget-by-partner',
        query:  "SELECT " +
                "partner, " +
                "min(ngo_category) as ngo_type, " +
                "sum(unicef_contribution) as unicef_contribution, " +
                "sum(partner_contribution) as partner_contribution, " +
                "sum(total_pca_value) total_pca_amount, " +
                "count(1) as num_pcas " +
                "FROM unicef_active_pcas " +
                "group by 1",
        cartoVisualizationID: '8adc94f2-be35-11e4-a9de-0e0c41326911',
        categorizedBy: 'partner',
        columnNames: ['unicef_contribution', 'partner_contribution'],
        rawData: []
    }),
    DFIDDashboard.Visualization.create({
        organizationSlugs: ['unicef'],
        title: 'PCAs by Programme Section',
        id: 'unicef-pca-by-programme-section',
        query:  "SELECT programme_section,count(*) as pcas " +
                "FROM unicef_active_pcas " +
                "group by 1 ",
        categorizedBy: 'programme_section',
        columnNames: ['pcas'],
        rawData: []
    }),    
    DFIDDashboard.Visualization.create({
        organizationSlugs: ['overview','fao'],
        title: 'Overall FAO Programmes',
        id: 'overall-fao-programmes',
        query:  "SELECT " +
                "* " +
                "FROM fao_stack ",
        cartoVisualizationID: 'b072fe0c-c1bb-11e4-9af8-0e853d047bba',
        categorizedBy: 'fao_program',
        columnNames: ['unicef_contribution', 'total_partner_contribution'],
        rawData: []
    }),
    DFIDDashboard.Visualization.create({
        organizationSlugs: ['overview','fao'],
        title: 'FAO Cash For Work Beneficiaries by NGO',
        id: 'fao-fcw-ngo',
        query:  "select " + 
                "ngo, " +
                "sum (total_beneficiaries) as beneficiaries " +
                "from fao_cfw_beneficiary_reg " +
                "group by 1 ",
        cartoVisualizationID: 'b072fe0c-c1bb-11e4-9af8-0e853d047bba',
        categorizedBy: 'ngo',
        columnNames: ['beneficiaries'],
        rawData: []
    }),




    DFIDDashboard.Visualization.create({
        organizationSlugs: ['fao'],
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
        organizationSlugs: ['sns'],
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
        organizationSlugs: ['sns'],
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
        organizationSlugs: ['sns'],
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
        organizationSlugs: ['sns'],
        title: 'SNS Scored FCS',
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
        organizationSlugs: ['sns'],
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
        organizationSlugs: ['unicef'],
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
    }),
    DFIDDashboard.Visualization.create({
        organizationSlugs: ['fao'],
        title: 'FAO Cash Transfers Beneficiary',
        id: 'fao-cfw-bydistrict',
        query:  "SELECT " +
                "min(the_geom_webmercator) as the_geom_webmercator, " +
                "min(cartodb_id) as cartodb_id, " +
                "district, " +
                "min(ngo) as NGO, " +
                "sum(total_beneficiaries) as total_beneficiaries, " +
                "sum(total_hhs) as total_hhs " +
                "FROM fao_cfw_beneficiary_reg " +
                "group by 3, " +
                "group by 5 desc ",
        cartoVisualizationID: '8adc94f2-be35-11e4-a9de-0e0c41326911',
        categorizedBy: 'district',
        columnNames: ['beneficiaries'],
        rawData: []
    }),

    DFIDDashboard.Visualization.create({
        organizationSlugs: ['overview','wfp'],
        title: 'WFP Beneficiaries by Category (Dec 2014)',
        id: 'wfp-dec-beneficiaries',
        query:  "SELECT " +
                "upper(region) as region, " +
                "sum(safety_net) as safety_net, " +
                "sum(relief) as relief, " +
                "sum(nutrition) as nutrition, " +
                "sum(livelihood) as livelihood " +
                "FROM wfp_dec_beneficiaries " +
                "where safety_net <> 0 or relief <> 0 or nutrition <> 0  or livelihood <> 0 " +
                "group by 1 " +
                "order by 1 ",
        categorizedBy: 'region',
        columnNames: ['safety_net', 'relief', 'nutrition', 'livelihood'],
        rawData: []
    }),
    DFIDDashboard.Visualization.create({
        organizationSlugs: ['overview','wfp'],
        title: 'WFP Deliveries in Metric Tonnes (Dec 2014)',
        id: 'wfp-dec-mt',
        query:  "SELECT " +
                "region, " +
                "sum(mt_total) as mt_total " +
                "from wfp_dec_beneficiaries " +
                "where mt_total <> 0 " +
                "group by 1 " +
                "order by 1 ", 
        categorizedBy: 'region',
        cartoVisualizationID: 'ab0c3934-c1dd-11e4-98db-0e9d821ea90d',
        columnNames: ['mt_total'],
        rawData: []
    }),

    DFIDDashboard.Visualization.create({
        organizationSlugs: ['overview'],
        title: 'Food Consumption Score - BRiCS & SNS',
        id: 'fcs_by_region_overview',
        query:  "select region,  " +
                "count(case when fcs::numeric(10,0)>35 then id else null end) as acceptable, " +
                "count(case when fcs::numeric(10,0)<=35 and fcs::numeric(10,0)>21 then id else null end) as borderline, " +
                "count(case when fcs::numeric(10,0)<=21 then id else null end) as poor " +
                "from sns_brics_mashup " +
                "group by 1 " +
                "order by 1 ",
        categorizedBy: 'region',
        columnNames: ['acceptable', 'borderline', 'poor'],
        rawData: []
    }),

    DFIDDashboard.Visualization.create({
        organizationSlugs: ['overview'],
        title: 'Coping Strategy Index - BRiCS & SNS',
        id: 'csi_by_region_overview',
        query:  "select region, " +
                "avg(csi_reduced) as csi " +
                "from sns_brics_mashup " +
                "group by 1 " +
                "order by 1 ",
        categorizedBy: 'region',
        columnNames: ['csi'],
        rawData: []
    })

];

DFIDDashboard.visualizationGroups = [
    DFIDDashboard.VisualizationGroup.create({
        id: 'hdds-csi',
        organizationSlugs: ['sns'],
        visualizationIDs: ['sns-scored-csi', 'sns-scored-hdds'],
    }),
    DFIDDashboard.VisualizationGroup.create({
        id: 'brics-activities',
        organizationSlugs: ['brics'],
        visualizationIDs: ['activity-groups-by-district', 'activity-groups-by-ngo'],
    }),
        DFIDDashboard.VisualizationGroup.create({
        id: 'wfp-dec',
        organizationSlugs: ['wfp'],
        visualizationIDs: ['wfp-dec-beneficiaries', 'wfp-dec-mt'],
    }),
        DFIDDashboard.VisualizationGroup.create({
        id: 'unicef-pca-budgets',
        organizationSlugs: ['unicef'],
        visualizationIDs: ['unicef-total-pca-budget-by-programme', 'unicef-total-pca-budget-by-partner','unicef-pca-by-programme-section'],
    }),
]

DFIDDashboard.Organization = Ember.Object.extend({
    visualizations: Ember.computed('slug', function() {
        var slug = this.get('slug');
        return DFIDDashboard.visualizations.filter(function(item) {
            console.log(item);
            return item.get('organizationSlugs').indexOf(slug) != -1;
        });
    }),
    visualizationGroups: Ember.computed('slug', function(item) {
        return DFIDDashboard.visualizationGroups.filter(function() {
            return item.get('organizationSlugs').indexOf(slug) != -1;
        })
    })
});

DFIDDashboard.organizations = ([
    {
        name: 'Overview',
        slug: 'overview',
    },
    {
        name: 'BRiCS',
        slug: 'brics',
    },
    {
        name: 'SNS',
        slug: 'sns',
    },
    {
        name: 'FAO',
        slug: 'fao',
    },
    {
        name: 'UNICEF',
        slug: 'unicef',
    },
    {
        name: 'WFP',
        slug: 'wfp',
    },
]).map(function(item) {
        return DFIDDashboard.Organization.create(item);
    });


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
DFIDDashboard.LabeledChartComponent = DFIDDashboard.StandaloneWidgetComponent.extend({});
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
            var indexOfItem = visualizationGroup.visualizationIDs.indexOf(item.id);
            if(indexOfItem === 0) { item.set('CSSClasses', 'tab-pane active') }
            else { item.set('CSSClasses', 'tab-pane') };
            return indexOfItem != -1;
        });
        console.log("Visualizations", visualizations);
        return visualizations;
    })
});

$('body').on('shown.bs.tab', 'a[data-toggle="tab"]', function (e) {
    $('body').resize();
});