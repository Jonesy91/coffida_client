/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Item, Input, Button, Text, View, Content, Toast, Spinner } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useAuthDispatch } from '../utilities/auth/AuthContext';
import { signIn } from '../utilities/auth/AuthService';

const LogInScreen = ({ navigation }) => {
    const dispatch = useAuthDispatch();
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [loading, setLoading] = useState(false);

    const requestLogIn = async () => {
        const data = {email, password};
        setLoading(true);
        signIn(data)
            .then((json) => {
                console.log('carried on')
                dispatch({ type: 'SIGN_IN', token: json.token, id: json.id.toString() });
            })
            .catch(error => {
                if(error.status === 400){
                    Toast.show({
                        text: 'Invalid username/password',
                        buttonText: 'Okay',
                        duration: 3000,
                        buttonStyle: { backgroundColor: '#4391ab'}
                    })
                } else{
                    Toast.show({
                        text: 'Something went wrong, try again',
                        buttonText: 'Okay',
                        duration: 3000,
                        buttonStyle: { backgroundColor: '#4391ab'}
                    })
                }
            })           
            .finally(() => setLoading(false))
    }
        
    return(
        <Content style={styles.content}>
            {loading ? (
                <Spinner />
            ) : (
                <>
                <Item style={styles.item}>
                <Input 
                    placeholder='Email' 
                    onChangeText={(inEmail) =>setEmail(inEmail)}
                />
            </Item>
            <Item style={styles.item}>
                <Input 
                    secureTextEntry
                    placeholder='Password' 
                    onChangeText={(inPassword) =>setPassword(inPassword)}
                />                
            </Item>
            <Button block onPress={() => requestLogIn()} style={styles.button}>
                <Text>Log In</Text>
            </Button>
            <View style={styles.view}>
                <Text>Don't have an accout? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('SignUp')}><Text style={styles.text}> Sign Up!</Text></TouchableOpacity>
            </View>
            </>
            )}
            
        </Content>
    );
}

const styles = StyleSheet.create({
    content:{
        backgroundColor:'white',
        margin: 20
    },
    button:{
         backgroundColor:'#4391ab',
         margin: 10
    },
    item:{
        margin:10
    },
    view:{
        flex:1, 
        flexDirection: 'row', 
        margin: 10
    },
    text:{
        color: '#16bff7',
        fontWeight:'bold',
        textDecorationLine:'underline'
    }
});
export default LogInScreen;