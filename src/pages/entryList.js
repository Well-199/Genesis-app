import React, {useEffect, useState} from 'react';
import { View, StatusBar, Modal, Text, FlatList, TouchableOpacity, Image, ActivityIndicator, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useClientName from '../hooks/useClientName';
import useSellerName from '../hooks/useSeller';
import NetInfo from '@react-native-community/netinfo';
import useGoBack from '../hooks/useGoBack';
import Send from '../Images/send.png';
import Add from '../Images/add.png';
import ToHome from '../Images/home.png';
import Delete from '../Images/delete.png';
import InputMask from '../components/inputMask';
import BaseUrl from '../services/baseURL';
import useDelete from '../hooks/useDelete';
import moment from 'moment';

const EntryList = ({navigation}) => {

    const [goBack] = useGoBack()
    const [value] = useState([])
    const [amount] = useState([])
    const [product] = useState([])
    const [pendente] = useState([])
    const [valueOfOne] = useState([])
    const [devolution] = useState([])
    const [list, setList] = useState([])
    const [balance, setBalance] = useState()
    const [spinner, setSpinner] = useState(true)

    const [client] = useClientName()
    const [seller] = useSellerName()
    const [modalVisible, setModalVisible] = useState(false)
    const [deleteOption, modalVisibleDelete, setModalVisibleDelete] = useDelete(navigation)

    const date = moment().format("YYYY-MM-DD")

    const connected = async (sendRequest) => {

        await NetInfo.fetch().then(state => {

            if(state.isConnected === true){
                sendRequest()
                setModalVisible(!modalVisible)
            }
            else{
                alert("Não é possivel enviar o pedido. Falha na Conexão, sem acesso a internet.");
            }
        });
    };

    async function sendRequest() {

        const req = await fetch(`${BaseUrl}akari/api/novo_pedido.php`,{
            method: 'POST',
            body: JSON.stringify({
                cliente: client,
                produto: JSON.stringify(product),
                valor: JSON.stringify(value),
                valor_unitario: JSON.stringify(valueOfOne),
                quantidade: JSON.stringify(amount),
                trocas: JSON.stringify(devolution),
                data_emissao: date,
                data_entrega: date,
                vendedor: seller,
                pendente: JSON.stringify(pendente),
                separado: false,
                total: balance
            }),
            Accept: 'application/json',
            headers: {"Content-Type": "application/json"} 
        })
            const json = await req.json()
            
            if(json.result){

                await AsyncStorage.removeItem('product')
                setSpinner(false)
                setModalVisible(!modalVisible)

                navigation.reset({
                    index: 0,
                    routes: [{name: 'Home'}],
                })
            }
            else{
                alert('ERRO! PEDIDO NAO ENVIADO')
                setModalVisible(!modalVisible)
            }
    }

    useEffect(() => {
        
        AsyncStorage.getItem('product').then(data => {
            const results = JSON.parse(data)
                if(results === null){
                    setList([])
                }
                else{
                    setList(results)
                }  
            results.map(item => {
                product.push(item.produto)
                value.push(parseFloat(item.valor))
                valueOfOne.push(parseFloat(item.valor_unitario))
                amount.push(item.quantidade)
                devolution.push(item.trocas) 
                pendente.push(item.pendente)
            })
            console.log('Pedido Item ', results)
        }) 
        setTimeout(() => {
            const balance = value.reduce((item, accumulator) => item + accumulator, 0)
            setBalance(balance)
        }, 1000)

    }, [])

    const orderEdit = (item) => {
        navigation.reset({
            index: 0,
            routes: [{name: 'OrderEdit', params: {entry: item}}],
        }) 
    }

    return(
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#34495e"/>
            <View style={styles.header}></View>
            
            <View style={styles.body}>
                <View style={styles.content}>
                    <Text style={styles.title}>Pedido {client}</Text>
                    {list ?
                    <FlatList data={list}
                        keyExtractor={item => item.id}
                        renderItem={({item}) => (
                        <TouchableOpacity 
                            onPress={() => orderEdit(item)}
                            style={styles.card}>
                            <View style={styles.cardView}>
                                <View style={styles.line}>
                                    <Text style={styles.product}>{item.produto}</Text>
                                    <Text style={styles.amount}>{item.quantidade}</Text>
                                    <Text style={styles.devolution}>{item.trocas}</Text>
                                    <Text style={styles.value}>{item.valor.toFixed(2)}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>    
                    )}>
                    </FlatList>
                    :
                    <Text>Sem Itens na Lista</Text>
                    }
                    
                </View>
                <InputMask value={balance}/>
            </View>
            <View style={styles.footer}>
                <TouchableOpacity
                    onPress={() => navigation.reset({
                        index: 0,
                        routes: [{name: 'Home'}],})}>
                    <Image source={ToHome} style={styles.homeNavigation}/>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={deleteOption}>
                    <Image source={Delete} style={styles.deleteButton}/>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => connected(sendRequest)}>
                    <Image source={Send} style={styles.sendButton}/>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => navigation.reset({
                        index: 0,
                        routes: [{name: 'ListProducts'}],})}>
                    <Image source={Add} style={styles.listProductsNavigation}/>
                </TouchableOpacity>
            </View>

            <Modal
                style={styles.modal}
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(!modalVisible)}
            >
                <View style={styles.modalView}>
                    {spinner === true ?
                    <View>
                        <Text style={styles.modalText}>Obrigado! seu pedido esta sendo enviado</Text>
                        <ActivityIndicator size="large" color="#fff" style={styles.spinner}/>
                    </View>
                    :
                    <Text style={styles.modalText}>Pedido enviado com sucesso</Text>
                    }
                </View>
            </Modal>

            <Modal
                style={styles.modal}
                animationType="slide"
                transparent={true}
                visible={modalVisibleDelete}
                onRequestClose={() => setModalVisibleDelete(!modalVisibleDelete)}
            >
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>Pedido excluido com sucesso</Text>
                    <ActivityIndicator size="large" color="#fff" style={styles.spinner}/>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#34495e'
    },

    header:{
        width: '100%',
        height: 30,
        backgroundColor: '#34495e',
    },
    
    title:{
        fontSize: 16,
		fontWeight: 'bold',
		textAlign: 'center',
		color: '#000',
        marginTop: 15,
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
        marginBottom: 15,
    },

    content:{
		flex: 1,	
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 10,
	},

    card:{
        width: 300,
        height: 60,
        marginTop: 10,
        marginLeft: 'auto',
        marginRight: 'auto',
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#34495e',
        shadowColor: '#000',
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

    line:{
        display: 'flex',
        flexDirection: 'row',
    },

    product:{
        width: 140,
        overflow: 'hidden',
        textAlign: 'center',
        textAlignVertical: 'center',
    },

    amount:{
        width: 40,
        height: 59,
        textAlign: 'center',
        textAlignVertical: 'center',
        borderLeftWidth: 1,
        borderLeftColor: '#34495e',
        borderStyle: 'solid',
    },

    devolution:{
        width: 40,
        height: 59,
        textAlign: 'center',
        textAlignVertical: 'center',
        borderLeftWidth: 1,
        borderLeftColor: '#34495e',
        borderStyle: 'solid',
    },

    value:{
        width: 60,
        height: 59,
        textAlign: 'center',
        textAlignVertical: 'center',
        borderLeftWidth: 1,
        borderLeftColor: '#34495e',
        borderStyle: 'solid',
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

    homeNavigation:{
        width: 35,
        height: 35,
    },

    deleteButton:{
        width: 35,
        height: 35,
    },

    sendButton:{
        width: 50,
        height: 55,
        marginBottom: 5,
    },

    listProductsNavigation:{
        width: 40,
        height: 40,
    },

    modalView:{
        flex: 1,
        width: '100%',
        backgroundColor: '#34495e',
        justifyContent: 'center',
        alignItems: 'center',
    },

    modalText:{
        fontSize: 24,
        color: '#FFFFFF',
        textAlign: 'center',
    },  

    spinner:{
        marginTop: 30,
    }
})

export default EntryList;