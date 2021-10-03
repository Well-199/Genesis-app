import React, {useState, useEffect} from 'react';
import { View, StatusBar, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Akari from '../Images/akari.jpg';
import { ToEnter } from '../components/svgTitleHome';

const Login = ({navigation}) => {

    const [userName, setUserName] = useState()
    const [password, setPassword] = useState()

    const login = () => {
        navigation.navigate('Home')
    }

    return(
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#ff3838"/>
            <Image source={Akari} style={styles.imageLogo}/>
            <View style={styles.inputArea}>
                {/* <TextInput
                    style={styles.inputName}
                    onChangeText={(text) => setUserName(text)}
                    placeholder="usuario"
                    value={userName}
                /> */}

                <TextInput
                    style={styles.inputPassword}
                    onChangeText={(text) => setPassword(text)}
                    placeholder="senha"
                    secureTextEntry
                    autoCorrect={false}
                    autoCapitalize="none"
                    value={password}
                />

                <TouchableOpacity
                    onPress={login}
                    style={styles.customButton}>
                    <ToEnter/>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#ff3838',
        justifyContent: 'center',
        alignItems: 'center',
    },

    imageLogo:{
        width: 100,
        height: 100,
        borderRadius: 10,
        marginBottom: 20
    },

    inputArea:{
        width: '80%',
        height: 'auto'
    },

    inputName:{
        height: 60,
        fontSize: 20,
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        paddingLeft: 20,
    },

    inputPassword:{
        height: 60,
        fontSize: 20,
        marginTop: 10,
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        paddingLeft: 20,
    },

    customButton:{
        height: 60,
        marginTop: 20,
        backgroundColor: '#000',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 4,
        borderStyle: 'solid',
        borderColor: '#FFFFFF'
    }
})

export default Login;