import React from 'react';
import { View, StatusBar, Image, Alert, TouchableOpacity, StyleSheet } from 'react-native';
import { NewRequest, MyDeliveries, Payments } from '../components/svgTitleHome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OrderListNavigation from '../components/orderListNavigation';
import useGoBack from '../hooks/useGoBack';
import Off from '../Images/off.png';

const Home = ({navigation}) => {

    const [goBack] = useGoBack()
      
    async function pendingRequest (){
        const pending = await AsyncStorage.getItem('product')

        if(pending === null){
            navigation.navigate('Customers')
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

    return(
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#34495e"/>
            <View style={styles.header}></View>
            <View style={styles.body}>
                <View style={styles.content}>
                    <TouchableOpacity 
                        style={styles.card}
                        onPress={pendingRequest}>
                        <View style={styles.cardView}>
                            <NewRequest/>
                        </View>
                    </TouchableOpacity>

                    <OrderListNavigation navigation={navigation}/>
                    
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
                <View style={styles.footer}>
				<TouchableOpacity
					onPress={() => navigation.reset({
						index: 0,
						routes: [{name: 'Login'}],})}>
					<Image source={Off} style={styles.off}/>
				</TouchableOpacity>
        	</View>
            </View>
        </View>
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
		paddingTop: 5,
        marginBottom: 50,
    },

    content:{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 20,
        paddingBottom: 5,
        marginTop: 10,
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
        backgroundColor: '#34495e',
    },

    cardView:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 'auto',
        marginBottom: 'auto',
    },

    footer:{
        width: 50,
        height: 50,
        display: 'flex',
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 10,
        backgroundColor: '#FFFFFF',
    },

    off:{
        width: 25,
        height: 25,
    },
})

export default Home;