import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native'
import EntryNavigator from './navigation/EntryNavigator';


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
