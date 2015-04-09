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
        organizationSlugs: ['overview','npa-boreholes'],

        title: 'NPA - Water point types',
        id: 'npa-boreholes-type-counts',
        query:  "SELECT verification_information_water_source_type as water_point_type, count (*) as water_points from npa_boreholes group by 1 order by water_point_type",
        categorizedBy: 'water_point_type',
        columnNames: ['water_points'],
        rawData: []
    }),      
    DFIDDashboard.Visualization.create({
        organizationSlugs: ['overview','npa-boreholes'],
        title: 'NPA - Payment for Access by Water Point Type',
        id: 'npa-water-pay-by-type',
        query:  "SELECT general_information_water_source as water_point_type, " +
                "count (case when person_identification_pay_for_water = 'yes' then cartodb_id else null end) as yes, " +
                "count (case when person_identification_pay_for_water = 'no' then cartodb_id else null end) as no " +
                "FROM npa_borehole_impact group by 1 order by water_point_type",
        categorizedBy: 'water_point_type',
        columnNames: ['yes','no'],
        rawData: []
    }),    
    DFIDDashboard.Visualization.create({
        organizationSlugs: ['overview','npa-boreholes'],
        title: 'NPA - Backup/Main Source by Water Point Type',
        id: 'npa-water-main-back',
        query:  "SELECT general_information_water_source as water_point_type, " + 
                "count (case when person_identification_water_source_importance = 'main_water_source' then cartodb_id else null end) as main, " + 
                "count (case when person_identification_water_source_importance = 'back_water_source' then cartodb_id else null end) as back_up " + 
                "FROM npa_borehole_impact group by 1 order by water_point_type",
        categorizedBy: 'water_point_type',
        columnNames: ['main','back_up'],
        rawData: []
    }),  
    DFIDDashboard.Visualization.create({
        organizationSlugs: ['overview','npa-boreholes'],
        title: 'NPA - Who Controls Access by Water Point Type',
        id: 'npa-water-access-type',
        query:  "SELECT general_information_water_source as water_point_type, " + 
                "count (case when access_community_chairman = 'True' then cartodb_id else null end) as community_chairman, " +
                "count (case when access_water_ngo_staffs = 'True' then cartodb_id else null end) as ngo_staffs, " + 
                "count (case when access_water_pastoralists = 'True' then cartodb_id else null end) as pastoralists, " +
                "count (case when access_water_village_elders = 'True' then cartodb_id else null end) as village_elders, " +
                "count (case when access_water_local_council = 'True' then cartodb_id else null end) as water_comittee " +
                "FROM npa_borehole_impact group by 1 order by water_point_type",
        categorizedBy: 'water_point_type',
        columnNames: ['community_chairman','ngo_staffs','pastoralists','village_elders','water_comittee'],
        rawData: []
    }),          
    DFIDDashboard.Visualization.create({
        organizationSlugs: ['overview','npa-boreholes'],
        title: 'NPA - Water Quality (Drinking) by Water Point Type',
        id: 'npa-water-quality-drinking-type',
        query:  "SELECT general_information_water_source as water_point_type, " +
                "count (case when water_quality_human_drinking_good = 'False' then cartodb_id else null end) as bad, " +
                "count (case when water_quality_human_drinking_good = 'True' then cartodb_id else null end) as good " + 
                "FROM npa_borehole_impact group by 1 order by water_point_type",
        categorizedBy: 'water_point_type',
        columnNames: ['good','bad'],
        rawData: []
    }),    
    DFIDDashboard.Visualization.create({
        organizationSlugs: ['overview','npa-boreholes'],
        title: 'NPA - Water Quality for Animals by Water Point Type',
        id: 'npa-water-animal-drinking-type',
        query:  "SELECT general_information_water_source as water_point_type, " +
                "count (case when water_good_for_animal_drinking = 'False' then cartodb_id else null end) as bad, " +
                "count (case when water_good_for_animal_drinking = 'True' then cartodb_id else null end) as good " + 
                "FROM npa_borehole_impact group by 1 order by water_point_type",
        categorizedBy: 'water_point_type',
        columnNames: ['good','bad'],
        rawData: []
    }),    

    DFIDDashboard.Visualization.create({
        organizationSlugs: ['yme-boreholes'],
        title: 'YME - Functional Boreholes',
        id: 'yme-functional-boreholes',
        chartType: 'pie',
        query:  "SELECT count(*) as boreholes, count(case when verification_information_state_of_water_source = 'true' then cartodb_id else null end) as functional, " +
                "count(case when verification_information_state_of_water_source = 'false' then cartodb_id else null end) as non_functional " +
                "FROM yme_borehole_verification_ndisha",
        categorizedBy: 'boreholes',
        columnNames: ['functional','non_functional'],
        rawData: []
    }),    

    DFIDDashboard.Visualization.create({
        organizationSlugs: ['yme-boreholes'],
        title: 'YME - Water Source Importance',
        id: 'yme-water-soure-importance',
        chartType: 'pie',
        query:  "SELECT count(*) as ben, count (case when person_identification_water_source_importance = 'main_water_source' then cartodb_id else null end) as main, " +
                "count (case when person_identification_water_source_importance = 'back_water_source' then cartodb_id else null end) as backup " +
                "FROM yme_borehole_impact",
        categorizedBy: 'ben',
        columnNames: ['main','backup'],
        rawData: []
    }),          

    DFIDDashboard.Visualization.create({
        organizationSlugs: ['yme-tvet'],
        title: 'YME - Intention to Expand Business',
        id: 'yme-tvet-intention-expand',
        chartType: 'pie',
        query:  "SELECT count(*) as tocateg, count (case when future_of_business_plan_business_expansion = 'yes_definitely' then cartodb_id else null end) as yes_definitely, " +
                "count (case when future_of_business_plan_business_expansion = 'yes_possibly' then cartodb_id else null end) as yes_possibly, " +
                "count (case when future_of_business_plan_business_expansion = 'no' then cartodb_id else null end) as no, " +
                "count (case when future_of_business_plan_business_expansion = 'refuse_to_answer' then cartodb_id else null end) as refusestoanswer " +
                "FROM labour_market_assessment_quantitative_tool2",
        categorizedBy: 'tocateg',
        columnNames: ['yes_definitely','yes_possibly','no','refusestoanswer'],
        rawData: []
    }),          

     DFIDDashboard.Visualization.create({
        organizationSlugs: ['yme-tvet'],
        title: 'YME - Incoming employees need Training ',
        id: 'yme-tvet-incoming-employees-training',
        chartType: 'pie',
        query:  "SELECT count(*) as tocateg, count (case when future_of_business_workers_need_special_training = 'yes' then cartodb_id else null end) as yes, " +
                "count (case when future_of_business_workers_need_special_training = 'no' then cartodb_id else null end) as no, " +
                "count (case when future_of_business_workers_need_special_training = 'refuses_to_answer' then cartodb_id else null end) as refusestoanswer " +
                "FROM labour_market_assessment_quantitative_tool2",
        categorizedBy: 'tocateg',
        columnNames: ['yes','no','refusestoanswer'],
        rawData: []
    }),  

    DFIDDashboard.Visualization.create({
        organizationSlugs: ['fao'],
        title: 'FAO - Cash-for-Work Beneficiary Registration',
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
        title: 'SNS - Scored CSI',
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
        title: 'SNS - Scored HDDS',
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
        title: 'SNS - Scored CSI',
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
        title: 'SNS - Scored FCS',
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



];

DFIDDashboard.visualizationGroups = [
    DFIDDashboard.VisualizationGroup.create({
        id: 'hdds-csi',
        organizationSlugs: ['sns'],
        visualizationIDs: ['sns-scored-csi', 'sns-scored-hdds'],
    }),
    DFIDDashboard.VisualizationGroup.create({
        id: 'brics-activities',
        organizationSlugs: ['brics','overview'],
        visualizationIDs: ['all-activity-groups-by-regions-all-ngos', 'activity-groups-by-ngo'],
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
        DFIDDashboard.VisualizationGroup.create({
        id: 'region-overview',
        organizationSlugs: ['indicators','overview'],
        visualizationIDs: ['fcs_by_region_overview', 'csi_by_region_overview'],
    }),
        DFIDDashboard.VisualizationGroup.create({
        id: 'overview-maps',
        organizationSlugs: ['indicators','overview'],
        visualizationIDs: ['overall-fao-programmes-2', 'wfp-dec-mt'],
    }),
        DFIDDashboard.VisualizationGroup.create({
        id: 'npa-boreholes-maps',
        organizationSlugs: ['npa-boreholes','overview'],
        visualizationIDs: ['npa-boreholes-types',''],
    }),
]

DFIDDashboard.Organization = Ember.Object.extend({
    visualizations: Ember.computed('slug', function() {
        var slug = this.get('slug');
        return DFIDDashboard.visualizations.filter(function(item) {
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
        name: 'NPA Boreholes',
        slug: 'npa-boreholes',
    },   
    {
        name: 'YME Boreholes',
        slug: 'yme-boreholes',
    },
    {
        name: 'YME TVET Centre',
        slug: 'yme-tvet',
    },
       {
        name: 'NIS Lights',
        slug: 'nis-lights',
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
        var rawData = visualization.get('rawData');
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
        var visualizationGroupID = this.get('visualizationGroupID');
        var visualizationGroup = DFIDDashboard.visualizationGroups.filter(function(item) {
            return item.id == visualizationGroupID;
        })[0];
        var visualizations = DFIDDashboard.visualizations.filter(function(item) {
            var indexOfItem = visualizationGroup.visualizationIDs.indexOf(item.id);
            if(indexOfItem === 0) { item.set('CSSClasses', 'tab-pane active') }
            else { item.set('CSSClasses', 'tab-pane') };
            return indexOfItem != -1;
        });
        return visualizations;
    })
});

$('body').on('shown.bs.tab', 'a[data-toggle="tab"]', function (e) {
    $('body').resize();
});

DFIDDashboard.MapGroupComponent = Ember.Component.extend({
    visualizations: Ember.computed('visualizationGroupID', function() {
        var visualizationGroupID = this.get('visualizationGroupID');
        var visualizationGroup = DFIDDashboard.visualizationGroups.filter(function(item) {
            return item.id == visualizationGroupID;
        })[0];
        var visualizations = DFIDDashboard.visualizations.filter(function(item) {
            var indexOfItem = visualizationGroup.visualizationIDs.indexOf(item.id);
            if(indexOfItem === 0) { item.set('CSSClasses', 'tab-pane active') }
            else { item.set('CSSClasses', 'tab-pane') };
            return indexOfItem != -1;
        });
        return visualizations;
    })
});

$('body').on('shown.bs.tab', 'a[data-toggle="tab"]', function (e) {
    $('body').resize();
});
