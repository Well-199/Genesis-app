import React, { useEffect, useState } from "react";
import NetInfo from '@react-native-community/netinfo';
import { View, TouchableOpacity, StyleSheet } from "react-native";
import {ListOfOrders} from '../components/svgTitleHome';

const OrderListNavigation = ({navigation}) => {

    const connected = async () => {

        await NetInfo.fetch().then(state => {
            
            if(state.isConnected === true){
                navigation.navigate('OrderList')
            }
            else{
                alert('Não é possivel visualizar os pedidos sem conexão com internet')
            }  
        })
    }

    return(
        <TouchableOpacity 
            style={styles.card}
            onPress={connected}>
            <View style={styles.cardView}>
                <ListOfOrders/>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    card:{
        width: '100%',
        height: '20%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,  
        elevation: 5,
        borderRadius: 5,
        backgroundColor: '#34495e',
    },

    cardView:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 'auto',
        marginBottom: 'auto',
    },
})

export default OrderListNavigation;