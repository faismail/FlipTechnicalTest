import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import TransactionList  from '../Pages/TransactionList';
import DetailTransaction from '../Pages/DetailTransaction';

const Stack = createStackNavigator();

const Router = ({ navigation }) => {
  return (
    <Stack.Navigator>
        <Stack.Screen
            name="TransactionList"
            component={TransactionList}
            options={{
            headerShown: false,
            }}
        />
        <Stack.Screen
            name="DetailTransaction"
            component={DetailTransaction}
            options={{
            headerShown: false,
            }}
        />
    </Stack.Navigator>
  );
};

export default Router;
