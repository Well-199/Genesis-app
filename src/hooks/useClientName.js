import { useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

const useClientName = () => {

    const [client, setClient] = useState()

    useEffect(() => {
        async function getData(){
            const clientName = await AsyncStorage.getItem('clientName')
            setClient(clientName)
        }
        getData()
    }, [])

    return [client];
}

export default useClientName;