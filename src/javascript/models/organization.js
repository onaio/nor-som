DFIDDashboard.Organization = DS.Model.extend({
    name: DS.attr('string'),
    slug: DS.attr('string')
});

DFIDDashboard.Organization.FIXTURES = [
    {
        id: 1,
        name: 'BRiCS',
        slug: 'brics'
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
