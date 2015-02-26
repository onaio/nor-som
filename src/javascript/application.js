window.DFIDDashboard = Ember.Application.create();

DFIDDashboard.organizations = [
    {
        id: 1,
        name: 'BRiCS',
        slug: 'brics',
        datasets: [
            {
                name: 'BRiCS Community Plans',
                cartoVisualizationID: 'c15061cc-bb3c-11e4-a7da-0e9d821ea90d',
                cartoTableName: 'Brics_community_plans_final',
            }
        ]

    },
    {
        id: 2,
        name: 'SNS',
        slug: 'sns'
    },
    {
        id: 3,
        name: 'FAO',
        slug: 'fao'
    }
]

DFIDDashboard.ApplicationAdapter = DS.FixtureAdapter.extend({
    queryFixtures: function(fixtures, query, type) {
        var key = Ember.keys(query)[0];
        return fixtures.filterBy(key, query[key]);
    }
});
