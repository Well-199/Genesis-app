import {getRealm} from './realm';

export const saveEntry = async (newItem) => {
   const realm = await getRealm()
   const product = newItem.product
   const value = newItem.value

   let data = {}

    realm.write(() => {
        data = {
            id: 'ABC',
            client: 'Marukai',
            product: [product],
            amount: [5],
            devolution: [1],
            value: [value],
            entryAt: new Date(),
            deliveryDate: new Date(),
            seller: 'Wellington',
            balance: 128.58
        }
    
        realm.create('Entry', data, true)
    })
    console.log(data)

    return data;
} 