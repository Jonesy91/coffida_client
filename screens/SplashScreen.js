/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { Content, H1 } from 'native-base';
import styles from '../style/screens/SplashScreenStyle';

/* 
The Splash screen which is displayed when the application starts
*/
const SplashScreen = () => (
        <Content contentContainerStyle={styles.content}>
            <H1 style={styles.h1}>CoffiDa</H1>
        </Content>
)

export default SplashScreen;
