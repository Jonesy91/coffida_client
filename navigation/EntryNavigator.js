/* eslint-disable linebreak-style */
/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Container } from 'native-base';
import LogInScreen from '../screens/LogInScreen';
import TabNavigator from './TabNavigator';
import RegistrationScreen from '../screens/RegistrationScreen';

export default function EntryNavigator() {
  const Stack = createStackNavigator();
  return (
    <Container>
      <Stack.Navigator>
        <Stack.Screen
          name="login"
          component={LogInScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="registration"
          component={RegistrationScreen}
          options={{ title: 'Register' }}
        />
        <Stack.Screen
          name="home"
          component={TabNavigator}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </Container>
  );
}
