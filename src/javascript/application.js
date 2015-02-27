window.DFIDDashboard = Ember.Application.create();

DFIDDashboard.datasets = [
    {
        organizationSlug: 'brics',
        name: 'BRiCS Community Plans',
        slug: 'brics-community-plans',
        cartoVisualizationID: 'c15061cc-bb3c-11e4-a7da-0e9d821ea90d',
        cartoTableName: 'brics_community_plans_final',
        rawData: []
    },
    {
        organizationSlug: 'brics',
        name: 'BRiCS Registration Data',
        slug: 'brics-registration-data',
        cartoVisualizationID: '8adc94f2-be35-11e4-a9de-0e0c41326911',
        cartoTableName: 'brics_reg_data',
        rawData: []
    }
]

DFIDDashboard.organizations = [
    {
        name: 'BRiCS',
        slug: 'brics',
        datasets: DFIDDashboard.datasets.filter(function(item) { return item.organizationSlug == 'brics' })

    },
    {
        name: 'SNS',
        slug: 'sns',
        datasets: DFIDDashboard.datasets.filter(function(item) { return item.organizationSlug == 'sns' })
    },
    {
        name: 'FAO',
        slug: 'fao',
        datasets: DFIDDashboard.datasets.filter(function(item) { return item.organizationSlug == 'fao' })
    }
]

DFIDDashboard.ApplicationAdapter = DS.FixtureAdapter.extend({
    queryFixtures: function(fixtures, query, type) {
        var key = Ember.keys(query)[0];
        return fixtures.filterBy(key, query[key]);
    }
});
