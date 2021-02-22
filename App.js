import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { Root } from 'native-base';
import Navigator from './navigation/Navigator';
import { AuthProvider } from './utilities/auth/AuthContext';



export default function App() {
    return (
          <Root>
            <AuthProvider>
              <Navigator />
            </AuthProvider>
          </Root>
    );
}
