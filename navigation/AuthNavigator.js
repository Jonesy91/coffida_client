import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LogInScreen from '../screens/LogInScreen';
import RegistrationScreen from '../screens/RegistrationScreen';

const Stack = createStackNavigator();

const AuthNavigator = ({ isSignout }) => (
  <Stack.Navigator initialRouteName="SignIn">
    <Stack.Screen
      name="SignIn"
      component={LogInScreen}
      options={{
        title: 'Sign in',
        animationTypeForReplace: isSignout ? 'pop' : 'push'
      }}
    />
    <Stack.Screen
      name="SignUp"
      component={RegistrationScreen}
      options={{
      }}
    />
  </Stack.Navigator>
);

export default AuthNavigator;