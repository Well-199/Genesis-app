import Realm from 'realm';
import EntrySchema from '../schemas/entrySchema';
import ProductsSchema from '../schemas/productsSchema';
import CustomersSchema from '../schemas/customersSchema';
import UsersSchema from '../schemas/usersSchema';

export const getRealm = async () => {
    const realm = await Realm.open({
    schema: [EntrySchema, ProductsSchema, CustomersSchema, UsersSchema],
        schemaVersion: 0,
    })
    return realm;
}