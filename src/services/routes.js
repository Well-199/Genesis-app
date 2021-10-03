import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Preload from '../startPages/preload';
import Login from '../startPages/login';
import Home from '../pages/home';
import ListProducts from '../pages/listProducts';
import AddProduct  from '../pages/addProduct';
import OrderEdit from '../pages/orderEdit';
import EntryList from '../pages/entryList';
import OrderList from '../pages/orderList';
import PendingList from '../pages/pending';
import Customers from '../pages/customers';
import useDelete from '../hooks/useDelete';

const Stack = createStackNavigator();

const Routes = () => {
  return(
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}} 
        initialRouteName="Preload">
        <Stack.Screen name="Preload" component={Preload}/>
        <Stack.Screen name="Login" component={Login}/>
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="Customers" component={Customers}/>
        <Stack.Screen name="ListProducts" component={ListProducts}/>
        <Stack.Screen name="AddProduct" component={AddProduct}/>
        <Stack.Screen name="OrderEdit" component={OrderEdit}/>
        <Stack.Screen name="EntryList" component={EntryList}/>
        <Stack.Screen name="OrderList" component={OrderList}/>
        <Stack.Screen name="PendingList" component={PendingList}/>
        <Stack.Screen name="useDelete" component={useDelete}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
};

export default Routes;