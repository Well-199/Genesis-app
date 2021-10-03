import Realm from 'realm';
import EntrySchema from '../schemas/entrySchema';

export const getRealm = async () => {
    const realm = await Realm.open({
        schema: [EntrySchema],
        schemaVersion: 0,
    })
    return realm;
}