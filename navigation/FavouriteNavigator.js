import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Container, Title } from 'native-base';
import ShopScreen from '../screens/ShopScreen';
import { Text } from 'react-native';
import FavouriteScreen from '../screens/FavouriteScreen';
import WriteReviewScreen from '../screens/WriteReviewScreen';

class FavouriteNavigator extends Component {
    render(){
        const Stack = createStackNavigator();
        return(
            <Container>
                <Stack.Navigator>
                    <Stack.Screen 
                        name="home" 
                        component={FavouriteScreen}
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

export default FavouriteNavigator;