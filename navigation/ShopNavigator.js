/* eslint-disable react/jsx-filename-extension */
/* eslint-disable linebreak-style */
/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Container } from 'native-base';

import ShopScreen from '../screens/ShopScreen';
import HomeScreen from '../screens/HomeScreen';
import WriteReviewScreen from '../screens/WriteReviewScreen';

export default function ShopNavigator() {
  const Stack = createStackNavigator();
  return (
      <>
      <Stack.Navigator>
        <Stack.Screen
          name="home"
          component={HomeScreen}
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
          options={{
            title:'Leave a review'
          }}
        />
      </Stack.Navigator>
      </>
  );
}
