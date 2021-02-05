import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { StyleProvider } from 'native-base';
import EntryNavigator from './navigation/EntryNavigator';
import getTheme from './native-base-theme/components';
import material from './native-base-theme/variables/material';


class App extends Component {
  render(){
    return (
        <NavigationContainer>
            <EntryNavigator/>
        </NavigationContainer>
    );
  }  
}
export default App;
