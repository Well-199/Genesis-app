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

    return data;
} 

export const saveTableProducts = async (array) => {
    const realm = await getRealm()
    
    let data = {}
        
        array.map(item => {
            realm.write(() => {
                data = {
                    id: item.id,
                    produto: item.produto,
                    status: item.status,
                    valor: parseFloat(item.valor)
                }   
            
            realm.create('Products', data, true) 
        })
        
    })   
 
    return data;
}

export const saveCustomers = async (customers) => {
    const realm = await getRealm()

    let clientName = {}

    customers.map(element => {
        realm.write(() => {
            clientName = {
                id: element.id,
                nome_fantasia: element.client,
            }
            realm.create('Customers', clientName, true)
        })
        
    })
    return clientName;
}
 
export const getEntries = async () => {
    const realm = await getRealm()

    const entries = realm.objects('Products')

    return entries
}

export const getProductsConnectFalse = async () => {
    const realm = await getRealm()

    const entries = realm.objects('Products')

    let productsName = {}

    entries.map(item => {
        realm.write(() => {
            productsName = {
                id: item.id,
                produto: item.produto,
                status: false,
                valor: parseFloat(item.valor)
            }
            realm.create('Products', productsName, true)
        })
    })
    
    return productsName
}

export const getClientName = async () => {
    const realm = await getRealm()

    const entries = realm.objects('Customers')

    return entries
}

export const saveUserName = async (user) => {
    const realm = await getRealm()

    let users = {}

    realm.write(() => {
        users = {
            id: user.id,
            nome: user.nome,
            senha: user.senha
        }
        realm.create('Users', users, true)
    })
    
    return users;
}

export const getUsers = async () => {
    const realm = await getRealm()

    const entries = realm.objects('Users')

    return entries
}
    