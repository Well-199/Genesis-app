import {useState, useEffect} from 'react';
import BaseUrl from '../services/baseURL';

const SetCustomers = () => {

    const [customers, setCustomers] = useState([])

    useEffect(() => {

        async function getCustomers(){
            const req = await fetch(`${BaseUrl}akari/api/clientes.php`,{
                method: 'GET',
                body: JSON.stringify(),
            })
            const res = await req.json()
            setCustomers(res.result) 
        }
        getCustomers()

    }, [])

    return [customers]
}
export default SetCustomers;