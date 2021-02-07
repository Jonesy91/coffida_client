/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-nested-ternary */
/* eslint-disable linebreak-style */
/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Button, Text } from 'native-base';
import TabNavigator from './TabNavigator';
import SplashScreen from '../screens/SplashScreen';
import { useAuthDispatch, useAuthState } from './AuthContext';
import AuthNavigator from './AuthNavigator';

export default function Navigator(){
  const Stack = createStackNavigator();  
  const { isLoading, isSignOut, userToken } = useAuthState();
  const dispatch = useAuthDispatch();

    React.useEffect(() => {
      const bootstrapAsync = async () => {
        let token = null;
        try{
          token = await AsyncStorage.getItem('@userKey');
        } catch (e) {
          console.log('error', e)
        }
        dispatch({type: 'RESTORE_TOKEN', token});
      };
      bootstrapAsync();
    }, [dispatch]);
    
    return (
        <NavigationContainer>
          <Stack.Navigator>
            {isLoading && (
              <Stack.Screen name="splash" component={SplashScreen} />
            )}
            {!isLoading && userToken == null ? (
              <Stack.Screen  isSignout={isSignOut} name="Auth" component={AuthNavigator} options={{ headerShown: false }} />
            ) : (
                <Stack.Screen name="main" component={TabNavigator} options={{}} />
            )}
          </Stack.Navigator>
        </NavigationContainer>
    );
}


