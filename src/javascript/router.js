DFIDDashboard.Router.map(function() {
    this.resource('organizations', { path: '/' });
    this.resource('organization', { path: '/:slug'});
    this.resource('table', { path: '/dataset/:slug/table'});
    this.resource('map', { path: '/dataset/:slug/map'});
    this.resource('charts', { path: '/dataset/:slug/charts'});
});

DFIDDashboard.OrganizationsRoute = Ember.Route.extend({
    model: function() { return DFIDDashboard.organizations; }
});

DFIDDashboard.OrganizationRoute = Ember.Route.extend({
    model:  function(params) {
        var organization =  DFIDDashboard.organizations.filter(function(item) {
            return (item.slug == params.slug);
        })[0];
        return organization;
    }
});

DFIDDashboard.TableRoute = Ember.Route.extend({
    model: function(params) {
        var dataset = DFIDDashboard.Dataset.create(
            DFIDDashboard.datasets.filter(function(item) {
                return item.slug == params.slug;
            })[0]);
        DFIDDashboard.sql.execute('SELECT * FROM ' + dataset.cartoTableName)
            .done(function(data) {
                dataset.set('rawData', data.rows);
            })
            .error(function(errors) {
                console.error(errors);
            });

        return dataset;
    }
});

DFIDDashboard.MapRoute = Ember.Route.extend({
    model: function(params) {
        return DFIDDashboard.datasets.filter(function(item) {
            return item.slug == params.slug;
        })[0];
    }
});

DFIDDashboard.ChartsRoute = Ember.Route.extend({
    model: function(params) {
        var dataset = DFIDDashboard.datasets.filter(function(item) {
            return item.slug == params.slug;
        })[0];
        var visualizations = dataset.visualizations;
        visualizations.map(function(visualization) {
            var query = visualization.query;
            DFIDDashboard.sql.execute(query)
                .done(function(data) {
                    var items = data.rows;
                    var chartDefinitions = items.map(function(item) {
                        var labelKey = Object.keys(item).filter(function(item) { return item !== 'count'; })[0];
                        var label = item[labelKey];
                        var count = item.count;
                        return { label: label, value: count };
                    });
                    visualization.set('chartDefinitions', chartDefinitions);
                })
                .error(function(error) { console.error(error); });
        });
        return dataset;
    }
});
