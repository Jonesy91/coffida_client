import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Container } from 'native-base';
import AccountScreen from '../screens/AccountScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import IonIcons from 'react-native-vector-icons/Ionicons';
import ShopNavigator from './ShopNavigator';
import FavouriteNavigator from './FavouriteNavigator';

class TabNavigator extends Component{
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
                    <Tab.Screen name="Home" component={ShopNavigator}/>
                    <Tab.Screen name="Favourites" component={FavouriteNavigator}/>
                    <Tab.Screen name="Account" component={AccountScreen}/>
                </Tab.Navigator>
            </Container>
        )
    }
}

export default TabNavigator;