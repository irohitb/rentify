import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import StackNavigator from './stackNavigator';

export const Routes = () => {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
};
export default Routes;
