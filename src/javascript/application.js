window.DFIDDashboard = Ember.Application.create();

DFIDDashboard.ApplicationAdapter = DS.FixtureAdapter.extend({
    queryFixtures: function(fixtures, query, type) {
        var key = Ember.keys(query)[0];
        return fixtures.filterBy(key, query[key]);
    }
});
