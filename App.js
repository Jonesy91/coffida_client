import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Text, View } from 'react-native';

class App extends Component {
  render(){
    let name = "nathan";
    
    return (
      <View style={styles.container}>
        <Text>Hello {name}</Text>
        <StatusBar style="auto" />
      </View>
    );
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
