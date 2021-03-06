import React, {useState}  from 'react';
import { View, Text, StatusBar, FlatList, Alert, Image, BackHandler, TouchableOpacity, StyleSheet } from 'react-native';
import GoBack from '../Images/back.png';
import InputMask from '../components/inputMask';

const PendingList = ({navigation, route}) => {

    const entry = route.params.entry
    const [data] = useState(entry.produto)
    const [balance] = useState(entry.total)
    console.log(data)

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
                <View style={styles.content}>
                    <Text style={styles.title}>Pedido {entry.cliente} / {entry.id}</Text>
                    
                    <FlatList data={data}
                    keyExtractor={item => item.id}
                    renderItem={({item}) => (
                        <TouchableOpacity 
                        style={styles.card}>
                        <View style={styles.cardView}>
                            <Text style={styles.itemText}>{item}</Text>
                        </View>
                    </TouchableOpacity> 
                    )}>
                </FlatList>
                </View>
                <InputMask value={balance}/> 
            </View>
            <View style={styles.footer}>
                <TouchableOpacity
                    onPress={() => navigation.reset({
                        index: 0,
                        routes: [{name: 'OrderList'}],})}>
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

    title:{
        fontSize: 16,
		fontWeight: 'bold',
		textAlign: 'center',
		color: '#000',
        marginTop: 15,
        marginBottom: 10,
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

    product:{
        width: 140,
        overflow: 'hidden',
        textAlign: 'center',
        textAlignVertical: 'center',
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#000',
        display: 'flex',
        flexDirection: 'column',
    },

    amount:{
        width: 40,
        height: 59,
        textAlign: 'center',
        textAlignVertical: 'center',
        borderLeftWidth: 1,
        borderLeftColor: '#ff3838',
        borderStyle: 'solid',
        borderStyle: 'solid',
        borderColor: '#000',
        display: 'flex',
        flexDirection: 'column',
    },

    devolution:{
        width: 40,
        height: 59,
        textAlign: 'center',
        textAlignVertical: 'center',
        borderLeftWidth: 1,
        borderLeftColor: '#ff3838',
        borderStyle: 'solid',
    },

    value:{
        width: 60,
        height: 59,
        textAlign: 'center',
        textAlignVertical: 'center',
        borderLeftWidth: 1,
        borderLeftColor: '#ff3838',
        borderStyle: 'solid',
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
        fontSize: 14,
        marginLeft: 3,
        color: '#FFFFFF'
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

    goBack:{
        width: 35,
        height: 35,
    },
})

export default PendingList;