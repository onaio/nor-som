DFIDDashboard.Router.map(function() {
    this.resource('index', { path: '/' });
    this.resource('viz', { path: '/:slug'});
});

DFIDDashboard.IndexRoute = Ember.Route.extend({
    model: function() { return DFIDDashboard.organizations; }
});

DFIDDashboard.VizRoute = Ember.Route.extend({
    model: function(params) {
        var organization = DFIDDashboard.organizations.filter(function(item) {
            return item.slug == params.slug;
        })[0];
        var visualizations = organization.get('visualizations');
        visualizations.map(function(visualization) {
            var query = visualization.query;
            if (query) {
                DFIDDashboard.sql.execute(query)
                    .done(function(data) {
                        var rows = data.rows;
                        var columns = visualization.columnNames.map(function(columnName) {
                            var column = [columnName];
                            rows.map(function(row) {
                                column.push(row[columnName]);
                            });
                            return column;
                        });
                        var chartData= {
                            columns: columns,
                            type: (visualization.chartType || 'bar'),
                            groups: [
                                visualization.columnNames
                            ]
                        };
                        var chartAxis = {
                            rotated: true,
                            x: {
                                type: 'category',
                                categories: rows.map(function(row) { return row[visualization.categorizedBy]; })
                            }
                        };
                        visualization.set('chartData', chartData);
                        visualization.set('chartAxis', chartAxis);
                        visualization.set('chartPadding', {left: 120});
                        //visualization.set('chartPalette', {pattern: ['#1C766C', '#00140F', '#65B0AC', '#77B8BE', '#DBF6FD']});
                        visualization.set('chartPalette', {pattern: ['#275D86', '#D1A932', '#D15F32', '#D14132']});
                        visualization.set('rawData', rows);
                    })
                    .error(function(error) { console.error(error); });
              }
        });
        return organization;
    }
});
