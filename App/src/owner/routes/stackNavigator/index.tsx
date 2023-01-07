import React from 'react';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';
import {Home} from '@src/owner/screens';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="home">
      <Stack.Screen name="home" component={Home} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
