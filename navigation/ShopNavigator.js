import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Container, Button } from 'native-base';
import ShopScreen from '../screens/ShopScreen';
import HomeScreen from '../screens/HomeScreen';
import WriteReviewScreen from '../screens/WriteReviewScreen';

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
                    <Stack.Screen
                        name="writeReview"
                        component={WriteReviewScreen}
                    />
                </Stack.Navigator>
            </Container>
        )
    }
}

export default ShopNavigator;