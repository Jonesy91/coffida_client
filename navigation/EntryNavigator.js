import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Container } from 'native-base';
import LogInScreen from '../screens/LogInScreen';
import MainNavigator from './MainNavigator';
import RegistrationScreen from '../screens/RegistrationScreen';

class EntryNavigator extends Component{
    render(){
        const Stack = createStackNavigator();
        return(
            <Container>
                <Stack.Navigator>
                    <Stack.Screen 
                        name="login" 
                        component={LogInScreen}
                        options={{
                            headerShown: false
                        }}
                    />
                    <Stack.Screen 
                        name="registration" 
                        component={RegistrationScreen} 
                        options={{title: 'Register'}}
                    />
                    <Stack.Screen 
                        name="home" 
                        component={MainNavigator}
                        options={{
                            headerShown: false
                        }}
                    />
                </Stack.Navigator>
            </Container>
        )
    }
}

export default EntryNavigator;