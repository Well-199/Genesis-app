import React, {useState, useEffect} from 'react';
import { View, StatusBar, FlatList, Text, Image, Alert, TouchableOpacity, BackHandler, StyleSheet } from 'react-native';
import BaseUrl from '../services/baseURL';
import GoBack from '../Images/back.png';
import moment from 'moment';

const OrderList = ({navigation}) => {

    const [data, setData] = useState([])
    const date = moment().format("YYYY-MM-DD")
  
    useEffect(() => {
        async function listFindByDate(){
            const req = await fetch(`${BaseUrl}api/pedidos/${date}`,{
                method: 'GET',
                body: JSON.stringify(),
                headers: {"Content-Type": 'application/json'} 
            })
            const json = await req.json()
            setData(json.result)
        }
        listFindByDate()

    }, [])

    useEffect(() => {
        const backAction = () => {
            Alert.alert("Espere!", "Tem certeza que deseja Sair?", [
            {
                text: "Não",
                onPress: () => null,
                style: "cancel"
            },
            { text: "Sim", onPress: () => BackHandler.exitApp() }
          ]);
            return true;
        };
    
        const backHandler = BackHandler.addEventListener(
          "hardwareBackPress",
          backAction
        );
    
        return () => backHandler.remove();

    }, [])

   return(
    <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#ff3838"/>
        <View style={styles.header}></View>
        <View style={styles.body}>
            <Text style={styles.dateTitle}>{moment().format("DD/MM/YYYY")}</Text>
            <View style={styles.content}>
                <FlatList data={data}
                    keyExtractor={item => item.id}
                    renderItem={({item}) => (
                    <TouchableOpacity 
                        onPress={() => navigation.reset({
                            index: 0,
                            routes: [{name: 'PendingList', params: {entry: item}}],
                        })}
                        style={styles.card}>
                        <View style={styles.cardView}>
                            <Text style={styles.itemText}>{item.cliente} / {item.id}</Text>
                        </View>
                    </TouchableOpacity>    
                    )}>
                </FlatList>
            </View>
        </View>
        <View style={styles.footer}>
            <TouchableOpacity
                onPress={() => navigation.reset({
                    index: 0,
                    routes: [{name: 'Home'}],})}>
                <Image source={GoBack} style={styles.goBack}/>
            </TouchableOpacity>
        </View>
    </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#ff3838'
    },

    header:{
        width: '100%',
        height: 30,
        backgroundColor: '#ff3838',
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

    dateTitle:{
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 10,
    },

    content:{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 5,
        paddingBottom: 30,
        marginTop: 10,
    },

    card:{
        width: '100%',
        height: 50,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,  
        elevation: 5,
        borderRadius: 5,
        backgroundColor: '#ff3838',
        marginBottom: 10,
    },

    cardView:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 'auto',
        marginBottom: 'auto',
    },

    itemText:{
        fontSize: 22,
        fontWeight: 'bold',
        color: '#FFFFFF'
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
})

export default OrderList;