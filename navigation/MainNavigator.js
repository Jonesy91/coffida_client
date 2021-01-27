import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Container } from 'native-base';
import HomeScreen from '../screens/HomeScreen';
import FavouriteScreen from '../screens/FavouriteScreen';
import AccountScreen from '../screens/AccountScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import IonIcons from 'react-native-vector-icons/Ionicons';

class MainNavigator extends Component{
    render(){
        const Tab = createBottomTabNavigator();
        return(
            <Container>
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
                    <Tab.Screen name="Favourites" component={FavouriteScreen}/>
                    <Tab.Screen name="Account" component={AccountScreen}/>
                </Tab.Navigator>
            </Container>
        )
    }
}

export default MainNavigator;