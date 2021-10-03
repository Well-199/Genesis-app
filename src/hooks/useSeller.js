import { useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

const useSellerName = () => {

    const [seller, setSeller] = useState()

    useEffect(() => {
        async function getName(){
            const sellerName = await AsyncStorage.getItem('name')
            setSeller(sellerName)
        }
        getName()
    }, [])

    return [seller];
}

export default useSellerName;