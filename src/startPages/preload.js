import React, {useEffect, useState} from 'react';
import { View, StatusBar, Image, ActivityIndicator, StyleSheet } from 'react-native';
import { Welcome } from '../components/svgTitleHome';
import Akari from '../Images/akari.jpg';

const Preload = ({navigation}) => {

    const [spinner, setSpinner] = useState(false)

    useEffect(() => {

        const animate = async () => {

            setTimeout(() => {
                setSpinner(true)
            }, 1000)

            setTimeout(() => {
                navigation.reset({index: 0, routes: [{name: 'Login'}]})
            }, 1800)
            
        }
        animate()
    }, [])

    return(
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#34495e"/>
            <Image source={Akari} style={styles.logoImage}/>
            {spinner !== false?
                <Welcome/>
            :
                <ActivityIndicator size="large" color="#fff" style={styles.spinner}/>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#34495e',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,  
        elevation: 5,
    },

    logoImage:{
        width: 100,
        height: 100,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#FFFFFF',
    },

    spinner:{
        marginTop: 30,
    },
})

export default Preload;