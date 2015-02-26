DFIDDashboard.Router.map(function() {
    // This tells Ember to detect when the application's URL matches '/'
    // and to render the todos template
    this.resource('organizations', { path: '/' })
    this.resource('organization', { path: '/:slug'})
})

DFIDDashboard.OrganizationsRoute = Ember.Route.extend({
    model: function() { return this.store.find('organization'); }
})

DFIDDashboard.OrganizationRoute = Ember.Route.extend({
    model: function(params) {
                return this.store.find('organization', { slug: params.slug });
            }
})
