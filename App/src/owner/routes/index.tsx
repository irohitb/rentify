import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigator from './stackNavigator';
import {enableScreens} from 'react-native-screens';

//as React.MutableRefObject<>

enableScreens();

export const Routes = () => {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
};
export default Routes;
