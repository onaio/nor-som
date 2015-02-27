DFIDDashboard.Router.map(function() {
    this.resource('organizations', { path: '/' })
    this.resource('organization', { path: '/:slug'})
    this.resource('table', { path: '/dataset/:slug/table'})
})

DFIDDashboard.OrganizationsRoute = Ember.Route.extend({
    model: function() { return DFIDDashboard.organizations; }
})

DFIDDashboard.OrganizationRoute = Ember.Route.extend({
    model:  function(params) {
                console.log(params.slug);
                var organization =  DFIDDashboard.organizations.filter(function(item) {
                    return (item.slug == params.slug);
                })[0];
                return organization; }
})

DFIDDashboard.TableRoute = Ember.Route.extend({
    model: function(params) {
        var dataset = DFIDDashboard.Dataset.create(
            DFIDDashboard.datasets.filter(function(item) {
                return item.slug == params.slug
            })[0]);
        var sql = new cartodb.SQL({user: 'okal'});
        sql.execute('SELECT * FROM ' + dataset.cartoTableName)
            .done(function(data) {
                dataset.set('rawData', data.rows);
            })
            .error(function(errors) {
                console.error(errors);
            })

        return dataset;
    }
});
