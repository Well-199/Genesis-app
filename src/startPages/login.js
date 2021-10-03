import React, {useState} from 'react';
import { View, StatusBar, Image, TextInput, ActivityIndicator, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {saveUserName} from '../services/entries';
import Akari from '../Images/akari.jpg';
import BaseUrl from '../services/baseURL';
import { ToEnter } from '../components/svgTitleHome';

const Login = ({navigation}) => {

    const [password, setPassword] = useState('')
    const [spinner, setSpinner] = useState(false)

    async function listFindByDate(){

        setSpinner(true)

        if(password !== ''){
            const req = await fetch(`${BaseUrl}akari/api/login.php/?senha=${password}`,{
                method: 'GET',
                body: JSON.stringify(),
                headers: {"Content-Type": 'application/json'} 
            })
            const json = await req.json()
            
            if(json.result.senha == password){
                
                saveUserName(json.result)
               
                await AsyncStorage.setItem('name', json.result.nome)
                navigation.reset({index: 0, routes: [{name: 'Home'}]})
                
            }
            else{
                setSpinner(false)
                alert('Senha incorreta')
                setPassword()
            }
        }
        else{
            setSpinner(false)
            alert('Digite a Senha')
        }
    }

    return(
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#34495e"/>
                <Image source={Akari} style={styles.imageLogo}/>
            <View style={styles.inputArea}>

                {spinner === false ? 
                <TextInput
                    style={styles.inputPassword}
                    onChangeText={(text) => setPassword(text)}
                    placeholder="senha"
                    keyboardType="numeric"
                    secureTextEntry
                    autoCorrect={false}
                    autoCapitalize="none"
                    value={password}
                />
                :
                <ActivityIndicator size="large" color="#fff" style={styles.spinner}/>
                }

                <TouchableOpacity
                    onPress={listFindByDate}
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
        backgroundColor: '#34495e',
        justifyContent: 'center',
        alignItems: 'center',
    },

    imageLogo:{
        width: 100,
        height: 100,
        borderRadius: 10,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#FFFFFF',
    },

    inputArea:{
        width: '80%',
        height: 'auto'
    },

    inputPassword:{
        height: 60,
        fontSize: 20,
        marginTop: 10,
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        paddingLeft: 20,
    },

    spinner:{
        marginTop: 10,
    },

    customButton:{
        height: 60,
        marginTop: 20,
        backgroundColor: '#bdc3c7',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 4,
        borderStyle: 'solid',
        borderColor: '#bdc3c7'
    },
})

export default Login;