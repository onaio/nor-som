DFIDDashboard.TableController = Ember.Controller.extend({
    columns: Ember.computed('slug', function() {
    }),
    content: Ember.computed('slug', function() {
    })
    slug: ''
})
