import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import ReviewScreen from './screens/FavouriteScreen';
import AccountScreen from './screens/AccountScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import IonIcons from 'react-native-vector-icons/Ionicons'
import { Container } from 'native-base';


class App extends Component {
  render(){
    const Stack = createStackNavigator();
    const Tab = createBottomTabNavigator();

    return (
      <Container>
        <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if(route.name === 'Home'){
                  iconName = focused ? 'md-home' : 'md-home-outline';
                } else if (route.name === 'Favourites'){
                  iconName = focused ? 'md-bookmark' : 'md-bookmark-outline';
                } else if (route.name === 'Account'){
                  iconName = focused ? 'md-person' : 'md-person-outline'
                }
                return <IonIcons name={iconName} size={size} color={color}/>;
              }
            })}
            tabBarOptions={{
              activeTintColor: 'tomato',
              inactiveTintColor: 'gray',
            }}
          >
          <Tab.Screen name="Home" component={HomeScreen}/>
          <Tab.Screen name="Favourites" component={ReviewScreen}/>
          <Tab.Screen name="Account" component={AccountScreen}/>
        </Tab.Navigator>
      </NavigationContainer>
      </Container>
    );
  }  
}
export default App;
