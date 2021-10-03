import {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {saveTableProducts, getEntries} from '../services/entries';
import BaseUrl from '../services/baseURL';

const useConnected = () => {

    const [entries, setEntries] =  useState([])

    useEffect(() => {

        async function check (){

            const pending = await AsyncStorage.getItem('product')
            if(pending === null){
                
                async function getTableProduct(){
                
                    let data = []
        
                    const req = await fetch(`${BaseUrl}akari/api/produtos.php`,{
                        method: 'GET',
                        body: JSON.stringify(),
                    })
                    const res = await req.json()
        
                    res.result.map(item => {
                        data.push({
                            id: item.id,
                            valor: parseFloat(item.preco),
                            produto: item.produto,
                            status: false
                        })
                    })
                    saveTableProducts(data)
                }
                getTableProduct()        
            }
        }
        check ()
    }, [])

    useEffect(() => {
        setTimeout(() => {
            async function loadEntries(){
                const data = await getEntries()
                setEntries(data)
            }
            loadEntries()
        }, 1000)
    }, [])

    return [entries]
}
export default useConnected