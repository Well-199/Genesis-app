import React, {useEffect, useState} from 'react';
import {View, KeyboardAvoidingView, StatusBar, Platform, Image, Text, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GoBack from '../Images/back.png';
import {saveTableProducts} from '../services/entries';
import useClientName from '../hooks/useClientName';
import useGoBack from '../hooks/useGoBack';
import { LogBox } from 'react-native';

const AddProduct = ({navigation, route}) => {

    const entry = route.params.entry;
    const [productId] = useState(`${entry.id}`)// id do produto no Banco de dados NAO ALTERAR
    const [client] = useClientName()
    const [product] = useState(`${entry.produto}`)
    const [valueOfOne] = useState(`${entry.valor}`)
    const [value] = useState(`${entry.valor.toFixed(2)}`)/* Valor que vai ser Somado*/
    const [valueOfoneItem] = useState(`${entry.valor}`)/*Valor unitario que e apresentado para o usuario */
    const [amount, setAmount] = useState(`${entry.quantidade || ''}`)
    const [devolution, setDevolution] = useState(`${entry.trocas || ''}`)
    const [list, setList] = useState([])
    const [goBack] = useGoBack()
    
    useEffect(() => {

        LogBox.ignoreLogs([
            'Non-serializable values were found in the navigation state',
        ])
    
        AsyncStorage.getItem('product').then(data => {
            const resusts = JSON.parse(data)
            if(resusts === null){
                setList([])
            }
            else{
                setList(resusts)
            }  
        }) 
        
    }, [])

    async function addItem () {

        const id = Math.random(5000).toString()

        if(amount > 0 && amount !== '' || devolution > 0 && devolution !== ''){  
            
            const sumAmount = parseFloat(amount) * parseFloat(value) || 0 * parseFloat(value)
            const sumDevolution =  parseFloat(devolution) * parseFloat(value) || 0 * parseFloat(value)
            const sumValue = parseFloat(sumAmount) - parseFloat(sumDevolution)


            const mylistItens = {
                id: id || entry.id,
                produtoId: productId,
                produto: product,
                valor: sumValue,/* Soma dos produtos menos as trocas */
                valor_unitario: parseFloat(valueOfOne),
                precoUnitario: valueOfoneItem,
                quantidade: amount || 0,
                trocas: devolution || 0,
                pendente: 'True'
            }

            const data = [{
                id: productId,// id do produto no Banco de dados NAO ALTERAR
                valor: parseFloat(entry.valor),
                produto: entry.produto,
                status: true
            }]
            saveTableProducts(data)
    
            list.push(mylistItens)
            await AsyncStorage.setItem('product', JSON.stringify(list))
            navigation.reset({
                index: 0,
                routes: [{name: 'EntryList'}],
            })
        }
        else{
            alert('Campo Quantidade ou Devolução não pode ser 0')
        }
    }

    return(
        <KeyboardAvoidingView 
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <StatusBar barStyle="light-content" backgroundColor="#34495e"/>
            <View style={styles.header}></View>
            <View style={styles.body}>
                <View style={styles.content}>
                    <Text style={styles.title}>Pedido {client}</Text>
                    <TouchableOpacity 
                        style={styles.card}>
                        <View style={styles.cardView}>
                            <Text style={styles.cardText}>{product}</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={styles.card}>
                        <View style={styles.cardView}>
                            <Text style={styles.cardText}>{value}</Text>
                        </View>
                    </TouchableOpacity>

                    <TextInput
                        style={styles.inputAmount}
                        onChangeText={(text) => setAmount(text)}
                        keyboardType="numeric"
                        placeholder="Quantidade"
                        value={amount}
                    />

                    <TextInput
                        style={styles.inputDevolution}
                        onChangeText={(text) => setDevolution(text)}
                        keyboardType="numeric"
                        placeholder="Devoluçoes"
                        value={devolution}
                    />

                    <TouchableOpacity 
                        onPress={addItem}
                        style={styles.cardButton}>
                        <View style={styles.cardViewButton}>
                            <Text style={styles.cardTextButton}>ADICIONAR</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.footer}>
                <TouchableOpacity
                    onPress={() => navigation.reset({index: 0, routes: [{name: 'ListProducts'}]})}>
                    <Image source={GoBack} style={styles.goBack}/>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#34495e'
    },

    header:{
        width: '100%',
        height: 50,
        backgroundColor: '#34495e',
    },

    title:{
		fontSize: 16,
		fontWeight: 'bold',
		textAlign: 'center',
		color: '#000',
        marginTop: 20,
	},

    body:{
        flex: 1,
        width: '90%',
        marginLeft: 'auto',
        marginRight: 'auto',
        backgroundColor: '#FFFFFF',
        borderTopEndRadius: 50,
        borderTopStartRadius: 50,
        borderBottomEndRadius: 50,
        borderBottomStartRadius: 50,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,  
        elevation: 8,
        marginBottom: 20,
    },

    content:{
		flex: 1,	
        paddingLeft: 30,
        paddingRight: 30,
	},

    card:{
        width: '100%',
        height: '10%',
        marginTop: 20,
        shadowColor: '#34495e',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,  
        elevation: 5,
        borderRadius: 5,
        backgroundColor: '#FFFFFF',
    },

    cardView:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop: 'auto',
        marginBottom: 'auto',
    },

    cardText:{
        fontSize: 20,
        fontWeight: 'bold',
        color: '#777',
        marginLeft: 10,
    },

    inputAmount:{
        width: '100%',
        height: 50,
        borderRadius: 5,
        marginTop: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,  
        elevation: 5,
        borderRadius: 5,
        fontSize: 20,
        fontWeight: 'bold',
        color: '#777',
        backgroundColor: '#FFFFFF',
    },

    inputDevolution:{
        width: '100%',
        height: 50,
        borderRadius: 5,
        marginTop: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,  
        elevation: 5,
        borderRadius: 5,
        fontSize: 20,
        fontWeight: 'bold',
        color: '#777',
        backgroundColor: '#FFFFFF',
    },

    cardButton:{
        width: '100%',
        height: 50,
        marginTop: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,  
        elevation: 5,
        borderRadius: 5,
        backgroundColor: '#34495e',
    },

    cardViewButton:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 'auto',
        marginBottom: 'auto',
    },

    cardTextButton:{
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginLeft: 10,
    },

    footer:{
        width: '100%',
        height: 60,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#FFFFFF',
        borderWidth: 1,
        borderStyle: 'solid',
        backgroundColor: '#FFFFFF',
    },

    goBack:{
        width: 35,
        height: 35,
    },
});

export default AddProduct;