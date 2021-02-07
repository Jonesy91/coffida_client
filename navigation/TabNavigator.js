/* eslint-disable react/jsx-filename-extension */
/* eslint-disable linebreak-style */
/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable react/prop-types */
import React from 'react';
import { Container, Icon } from 'native-base';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AccountScreen from '../screens/AccountScreen';
import ShopNavigator from './ShopNavigator';
import FavouriteNavigator from './FavouriteNavigator';

const Tab = createBottomTabNavigator();

const TabNavigator = () => (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = focused ? 'md-home' : 'md-home-outline';
            } else if (route.name === 'Favourites') {
              iconName = focused ? 'md-bookmark' : 'md-bookmark-outline';
            } else if (route.name === 'Account') {
              iconName = focused ? 'md-person' : 'md-person-outline';
            }
            return <Icon name={iconName} style={{fontSize:size, color:color}} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="Home" component={ShopNavigator}/>
        <Tab.Screen name="Favourites" component={FavouriteNavigator} />
        <Tab.Screen name="Account" component={AccountScreen} />
      </Tab.Navigator>
)

export default TabNavigator;