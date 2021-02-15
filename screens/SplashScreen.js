import React from 'react';
import { StyleSheet } from 'react-native';
import { Content, H1 } from 'native-base';

const SplashScreen = () => (
        <Content contentContainerStyle={styles.content}>
            <H1 style={styles.h1}>CoffiDa</H1>
        </Content>
)

const styles = StyleSheet.create({
    content:{
        flex:1,
        justifyContent: 'center',
        alignItems:'center',
        backgroundColor: '#2f6678'
    },
    h1:{
        color:'white',
    }
});

export default SplashScreen;
