DFIDDashboard.Organization = DS.Model.extend({
    name: DS.attr('string'),
    slug: DS.attr('string'),
    datasets: DS.hasMany('dataset', { async: true})
});

DFIDDashboard.Organization.FIXTURES = [
    {
        id: 1,
        name: 'BRiCS',
        slug: 'brics',
        datasets: [1]
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
