/* eslint-disable linebreak-style */
/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Container } from 'native-base';
import ShopScreen from '../screens/ShopScreen';
import FavouriteScreen from '../screens/FavouriteScreen';
import WriteReviewScreen from '../screens/WriteReviewScreen';
import HeaderMenu from '../components/HeaderMenu';

export default function FavouriteNavigator() {
  const Stack = createStackNavigator();
  return (
    <Container>
      <Stack.Navigator>
        <Stack.Screen
          name="favourite"
          component={FavouriteScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="shopScreen"
          component={ShopScreen}
          options={{
            title:'',
            headerTransparent: true,
            headerTintColor: 'white',
          }}
        />
        <Stack.Screen
          name="writeReview"
          component={WriteReviewScreen}
        />
      </Stack.Navigator>
    </Container>
  );
}
