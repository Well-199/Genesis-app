import React  from 'react';
import {View, StatusBar, Image, Text, ActivityIndicator, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import GoBack from '../Images/back.png';
import useGoBack from '../hooks/useGoBack';
import useConnected from '../hooks/useConnected';

const ListProducts = ({navigation}) => {
	
	const [entries] = useConnected([])
	const [goBack] = useGoBack()
	
	function nextPage (item){

		navigation.reset({
            index: 0,
            routes: [{name: 'AddProduct', params: {entry: item}}],
        })
  	}

	return(
		<View style={styles.container}>
			<StatusBar barStyle="light-content" backgroundColor="#34495e"/>
			<View style={styles.header}></View>
			<View style={styles.body}>
				<Text style={styles.title}>Produtos</Text>
				<View style={styles.content}>
					{entries.length > 0 ?
					<FlatList data={entries}
						keyExtractor={item => item.id}
						renderItem={({item}) => (
						<View style={styles.card}>
							<TouchableOpacity 
								onPress={() => nextPage(item)}>
								{item.status === false ?
								<Text style={styles.cardText}>{item.produto}</Text>
								:
								<Text style={styles.cardTextIncludes}>{item.produto}</Text> 
								}
							</TouchableOpacity> 
						</View>
					)}>
					</FlatList>
					:
					<ActivityIndicator size="large" color="#34495e"/>
					}
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
		backgroundColor: '#34495e',
	}, 

	cardText:{
        fontSize: 18,
        color: '#FFFFFF',
        fontWeight: 'bold',
		marginLeft: 5,
    },

	cardTextIncludes:{
		fontSize: 18,
		color: '#7f8c8d',
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