/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react';
import { Item, Input, Button, Text, View, Content, Spinner, H1 } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useAuthDispatch } from '../utilities/auth/AuthContext';
import { signIn } from '../utilities/auth/AuthService';
import styles from '../style/screens/LogInScreenStyle';
import { displayMessage } from '../utilities/error/errorHandler';

/* 
The log in screen provides user with an interface to log into the application.
*/
const LogInScreen = ({ navigation }) => {
    const dispatch = useAuthDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    /* 
    Checks the users input meets the email and password reaquirements
    */
    const validateInput = (inEmail, inPassword) => {
        if(inEmail.includes('@')){
            if(inPassword.length >= 6) {
                return true;
            }
            displayMessage('Minimum password length is 6 characters');
        } else {
            displayMessage('Please enter a valid email');
        }
        return false;
    }

    /* 
    requestLogin will validate the users input, if succesful it will make the request 
    to log in the user.
    */
    const requestLogIn = async () => {
        const data = {email, password};
        if(validateInput(email,password)){
            setLoading(true);
            signIn(data)
                .then((json) => {
                    dispatch({ type: 'SIGN_IN', token: json.token, id: json.id.toString() });
                })
                .catch(error => {
                    if(error === 400){
                        displayMessage('Invalid username/password');
                    } else{
                        displayMessage('Something went wrong, please try again');
                    }
                })           
                .finally(() => setLoading(false))
        }
    }
        
    return(
        <Content style={styles.content}>
            {loading ? (
                <Spinner />
            ) : (
                <>
                <H1>CoffiDa</H1>
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
            <Button primary block onPress={() => requestLogIn()} style={styles.button}>
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

export default LogInScreen;