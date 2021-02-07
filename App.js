import 'react-native-gesture-handler';
import React, { Component } from 'react';
import Navigator from './navigation/Navigator';
import { AuthProvider } from './navigation/AuthContext';


export default function App() {
    return (
        <AuthProvider>
          <Navigator />
        </AuthProvider>
    );
}
