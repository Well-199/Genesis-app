import React, {useEffect} from 'react';
import {View, StatusBar, Image, Text, FlatList, Alert, BackHandler, TouchableOpacity, StyleSheet} from 'react-native';
import Database from '../../database';
import GoBack from '../Images/back.png';

const ListProducts = ({navigation}) => {

  	function nextPage (item){
		navigation.navigate('AddProduct', {entry: item})
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
			<View style={styles.header}></View>
			<View style={styles.body}>
				<Text style={styles.title}>Akari Produtos</Text>
				<View style={styles.content}>
					<FlatList data={Database}
						keyExtractor={item => item.cod}
						renderItem={({item}) => (
						<View style={styles.card}>
							<TouchableOpacity 
								onPress={() => nextPage(item)}>
								<Text style={styles.cardText}>{item.produto}</Text>
							</TouchableOpacity> 
						</View>
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

	title:{
		fontSize: 16,
		fontWeight: 'bold',
		textAlign: 'center',
		marginTop: 5,
		color: '#000',
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
        marginBottom: 15,
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
		height: 60,
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-start',
		padding: 5,
		marginBottom: 10,
		borderRadius: 5,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.8,
		shadowRadius: 2,  
		elevation: 5,
		borderRadius: 5,
		backgroundColor: '#ff3838',
	}, 

	cardText:{
        fontSize: 18,
        color: '#FFFFFF',
        fontWeight: 'bold',
		marginLeft: 5,
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

export default ListProducts;