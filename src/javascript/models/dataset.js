DFIDDashboard.Dataset = DS.Model.extend({
    name: DS.attr('string'),
    cartoVisualizationID: DS.attr('string'),
    cartoTableName: DS.attr('string'),
    organization: DS.belongsTo('organization')
});

DFIDDashboard.Dataset.FIXTURES = [
    {
        id: 1,
        name: 'BRiCS Community Plans',
        cartoVisualizationID: 'c15061cc-bb3c-11e4-a7da-0e9d821ea90d',
        cartoTableName: 'Brics_community_plans_final',
        organization: 1
    }
]
