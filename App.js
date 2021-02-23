/* eslint-disable react/jsx-filename-extension */
import 'react-native-gesture-handler';
import React from 'react';
import { Root, StyleProvider } from 'native-base';
import Navigator from './navigation/Navigator';
import { AuthProvider } from './utilities/auth/AuthContext';
import getTheme from './native-base-theme/components';
import platform from './native-base-theme/variables/platform';


export default function App() {
    return (
          <Root>
            <StyleProvider style={getTheme(platform)}>
            <AuthProvider>
              <Navigator />
            </AuthProvider>
            </StyleProvider>
          </Root>
    );
}
