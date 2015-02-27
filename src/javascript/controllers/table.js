DFIDDashboard.TableController = Ember.Controller.extend({
    columns: Ember.computed('content.rawData', function() {
        if(!this.content.rawData[0]) { return []; }
        return Object.keys(this.content.rawData[0]);
    }),
    rows: Ember.computed('columns', function() {
        var controller = this
        var keys = controller.get('columns')
        var rows = this.content.rawData.map(function(row) {
            var values = [];
            for(index in keys) {
                var key = keys[index];
                if(row.hasOwnProperty(key)) {
                    values.push(row[key]);
                }
            }
            return values;
        })
        return rows;
    }),
    name: Ember.computed('content.rawData', function() {
        return this.content.name;
    })
});
