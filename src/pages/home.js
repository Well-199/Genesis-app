import React, { useEffect } from 'react';
import { View, StatusBar, Image, Alert, TouchableOpacity, BackHandler, StyleSheet } from 'react-native';
import { NewRequest, ListOfOrders, MyDeliveries, Payments } from '../components/svgTitleHome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Akari from '../Images/akari.jpg';

const Home = ({navigation}) => {

    async function pendingRequest (){
        const pending = await AsyncStorage.getItem('product')

        if(pending === null){
            navigation.navigate('ListProducts')
        }
        else{
            Alert.alert(
                "Ops!",
                "Existe um pedido não enviado é necessario enviar, excluir ou terminar esse pedido para criar um novo, deseja visualizar o pedido ?",
                [
                  {
                    text: "Continuar ?",
                    onPress: () => navigation.navigate('ListProducts'),
                    style: "cancel"
                  },
                  { text: "Visualizar ?", onPress: () => navigation.navigate('EntryList')}
                ]
            );
        }
    }

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
            <View style={styles.header}>
                <View style={styles.cardImage}>
                    <Image source={Akari} style={styles.image}/>
                </View>
            </View>
            <View style={styles.body}>
                <View style={styles.content}>
                    <TouchableOpacity 
                        style={styles.card}
                        onPress={pendingRequest}>
                        <View style={styles.cardView}>
                            <NewRequest/>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.card}
                        onPress={() => navigation.navigate('OrderList')}>
                        <View style={styles.cardView}>
                            <ListOfOrders/>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.card}>
                        <View style={styles.cardView}>
                            <MyDeliveries/>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.card}>
                        <View style={styles.cardView}>
                            <Payments/>
                        </View>
                    </TouchableOpacity>
                </View>
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
        height: 150,
        backgroundColor: '#ff3838',
    },

    cardImage:{
        width: 100,
        height: 100,
        marginTop: 30,
        marginLeft: 'auto',
        marginRight: 'auto',
    },

    image:{
        width: 100,
        height: 100,
        borderRadius: 10,
    },

    body:{
        flex: 1,
        width: '100%',
        backgroundColor: '#FFFFFF',
        borderTopEndRadius: 50,
        borderTopStartRadius: 50,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,  
        elevation: 5,
    },

    content:{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        padding: 20,
        marginTop: 15,
    },

    card:{
        width: '100%',
        height: '20%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,  
        elevation: 5,
        borderRadius: 5,
        backgroundColor: '#ff3838',
    },

    cardView:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 'auto',
        marginBottom: 'auto',
    },
})

export default Home;