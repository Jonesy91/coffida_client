import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Container, Title } from 'native-base';
import ShopScreen from '../screens/ShopScreen';
import { Text } from 'react-native';
import HomeScreen from '../screens/HomeScreen';

class ShopNavigator extends Component {
    render(){
        const Stack = createStackNavigator();
        return(
            <Container>
                <Stack.Navigator>
                    <Stack.Screen 
                        name="home" 
                        component={HomeScreen}
                        options={{headerShown: false}}
                    />
                    <Stack.Screen
                        name="shopScreen"
                        component={ShopScreen}
                    />
                </Stack.Navigator>
            </Container>
        )
    }
}

export default ShopNavigator;