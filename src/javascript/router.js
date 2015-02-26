DFIDDashboard.Router.map(function() {
    // This tells Ember to detect when the application's URL matches '/'
    // and to render the todos template
    this.resource('organizations', { path: '/' })
})

DFIDDashboard.OrganizationsRoute = Ember.Route.extend({
    model: function() { return this.store.find('organization'); }
})
