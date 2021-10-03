import { useState } from 'react'
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useDelete = (navigation) => {

    const [modalVisibleDelete, setModalVisibleDelete] = useState(false)

    const deleteOption = () => {
        Alert.alert(
            "Espere!",
            "Deseja excluir este pedido ?",
            [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              { text: "OK", onPress: () => clear()}
            ]
        );
    }

    const clear = async () => {
        setModalVisibleDelete(true)
        await AsyncStorage.removeItem('product')

        setTimeout(() => {
            setModalVisibleDelete(false)
        }, 2000)
        navigation.navigate('Home')
        // navigation.reset({index: 0, routes: [{name: 'Home'}]})
    }

    return [deleteOption, modalVisibleDelete, setModalVisibleDelete]
}

export default useDelete