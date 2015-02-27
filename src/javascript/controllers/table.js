DFIDDashboard.TableController = Ember.Controller.extend({
    columns: Ember.computed('content.rawData', function() {
        console.log(this.content.rawData[0]);
        if(!this.content.rawData[0]) { return []; }
        return Object.keys(this.content.rawData[0]);
    }),
    rows: Ember.computed('content.rawData', function() {
        var rows = this.content.rawData.map(function(row) {
            var values = [];
            for(key in this.columns) {
                if(row.hasOwnProperty(key)) {
                    values.push(row[key]);
                }
            }
            return values;
        })
        console.log(rows);
    }),
    name: Ember.computed('content.rawData', function() {
        return this.content.name;
    })
});
