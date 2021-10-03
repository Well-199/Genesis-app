import React, {useEffect, useState} from 'react';
import {View, Text, KeyboardAvoidingView, StatusBar, Alert, Image, Platform, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {saveTableProducts} from '../services/entries';
import useClientName from '../hooks/useClientName';
import Go from '../Images/go.png';
import useGoBack from '../hooks/useGoBack';
import Delete from '../Images/delete.png';

const OrderEdit = ({navigation, route}) => {

    const entry = route.params.entry;
    const [productId] = useState(`${entry.produtoId}`)// id do produto no Banco de dados NAO ALTERAR
    const [client] = useClientName()
    const [product] = useState(`${entry.produto}`)
    const [value] = useState(`${parseFloat(entry.precoUnitario).toFixed(2)}`)
    const [valueOfOne] = useState(`${entry.valor_unitario}`)
    const [pendente] = useState(`${entry.pendente}`)
    const [amount, setAmount] = useState(`${entry.quantidade || 0}`)
    const [devolution, setDevolution] = useState(`${entry.trocas || 0}`)
    const [list, setList] = useState([])
    const [goBack] = useGoBack()

    useEffect(() => {
        AsyncStorage.getItem('product').then(data => {
            const resusts = JSON.parse(data)
            setList(resusts)
        }) 
    }, [])

    async function addItem () {

        if(amount > 0 && amount !== '' || devolution > 0 && devolution !== ''){     
            const sumAmount = parseFloat(amount) * parseFloat(value) || 0 * parseFloat(value)
            const sumDevolution =  parseFloat(devolution) * parseFloat(value) || 0 * parseFloat(value)
            const sumValue = parseFloat(sumAmount) - parseFloat(sumDevolution)

            let newList = list

            newList.map(item => {
                if(item.id === entry.id){
                    item.quantidade = amount || 0
                    item.trocas = devolution || 0
                    item.valor = sumValue
                    item.valor_unitario = valueOfOne
                    item.pendente = pendente
                }
                return newList
            })
    
            await AsyncStorage.setItem('product', JSON.stringify(newList))
            
            navigation.reset({
                index: 0,
                routes: [{name: 'EntryList'}],
            }) 
            
        }
        else{
            alert('Campo Quantidade ou Devolução não pode ser 0')
        }
    }

    const deleteOption = () => {
        Alert.alert(
            "Espere!",
            "Deseja excluir este item do pedido ?",
            [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              { text: "OK", onPress: () => onDeleteItem()}
            ]
        );
    }

    function onSaveStatus () {
        const data = [{
            id: productId,// id do produto no Banco de dados NAO ALTERAR
            valor: parseFloat(entry.valor),
            produto: entry.produto,
            status: false
        }]
        saveTableProducts(data)
    
        return data
    }

    const onDeleteItem = async () => {

        const removedItem = list.filter(item => item.id !== entry.id)
        await AsyncStorage.setItem('product', JSON.stringify(removedItem))
        setList(removedItem)
        onSaveStatus()

        const verificarPedido = await AsyncStorage.getItem('product')
        console.log('Pedido ', verificarPedido)

        if(verificarPedido == '[]'){
            await AsyncStorage.removeItem('product')
            navigation.reset({index: 0, routes: [{name: 'Home'}]})
        }
        else{
            navigation.reset({index: 0, routes: [{name: 'EntryList'}]})
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
                    <Text style={styles.title}>Alterar Pedido {client}</Text>
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
                            <Text style={styles.cardTextButton}>ALTERAR</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.footer}>
                <TouchableOpacity
                    onPress={deleteOption}>
                    <Image source={Delete} style={styles.deleteButton}/>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.reset({index: 0, routes: [{name: 'EntryList'}]})}>
                    <Image source={Go} style={styles.deleteButton}/>
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
        justifyContent: 'space-around',
        alignItems: 'center',
        borderColor: '#FFFFFF',
        borderWidth: 1,
        borderStyle: 'solid',
        backgroundColor: '#FFFFFF',
    },

    deleteButton:{
        width: 35,
        height: 35,
    },

});

export default OrderEdit;