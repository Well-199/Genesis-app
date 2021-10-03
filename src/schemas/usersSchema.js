const UsersSchema = {
    name: 'Users',
    primaryKey: 'id',
    properties: {
        id: 'string',
        nome: 'string',
        senha: 'string'
    }
}

export default UsersSchema;