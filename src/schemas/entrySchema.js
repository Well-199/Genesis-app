const EntrySchema = {
    name: 'Entry',
    primaryKey: 'id',
    properties: {
        id: 'string',
        client: 'string',
        product: {type: 'string[]', optional: true},
        amount: {type: 'int[]', optional: true},
        devolution: {type: 'int[]', optional: true},
        value: {type: 'double[]', optional: true},
        entryAt: {type: 'date', optional: true},
        deliveryDate: {type: 'date', optional: true},
        seller: 'string',
        balance: 'double'
    }
}

export default EntrySchema;