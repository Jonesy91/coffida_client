/* eslint-disable react/jsx-filename-extension */
import { Text, Item, Input, Button, Content, Spinner } from 'native-base';
import React, { useState } from 'react';
import { signUp } from '../utilities/auth/AuthService';
import { useAuthDispatch } from '../utilities/auth/AuthContext';
import styles from '../style/screens/RegistrationScreenStyle';
import { displayMessage } from '../utilities/error/errorHandler';

/*
The registration screen provides and interface for the user to create a new account.
*/
const RegistrationScreen = ({ navigation }) => {
    const [firstName, setFirstName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [signUpLoading, setSignUpLoading] = useState(false);
    const dispatch = useAuthDispatch();

    /* 
    This function will validate the users input to make sure all fields are filled,
    and the password and email meet the requirements.
    */
    const validateInput = (inFirstName,inSurname,inEmail,inPassword) => {
        if(inFirstName !== '') {
            if(inSurname !== '') {
                if(inEmail.includes('@')){
                    if(inPassword.length >= 6) {
                        return true;
                    }
                    displayMessage('Minimum password length is 6 characters');
                } else {
                    displayMessage('Please enter a valid email');
                }
            } else {
                displayMessage('Please provide a surname');
            }
        } else {
            displayMessage('Please provide a first name');
        }
        return false
    }

    /* 
    This function will attempt to create a new account for the user if 
    their inputs pass validation.
    */
    const register = async () => {
        if(validateInput(firstName,surname,email,password)){
            setSignUpLoading(true);
            signUp(firstName,surname,email,password)
                .then((data) => {
                    dispatch({ type: 'REGISTER', token: data.userId })
                    displayMessage('Account created!');
                    setSignUpLoading(false);
                    navigation.navigate('SignIn');
                })
                .catch((error) => {
                    if(error.status === 400){
                        displayMessage('Please check your password and email are valid');
                    } else {
                        displayMessage('Failed to create account, please try again');
                    }
                })
                .finally(() => setSignUpLoading(false));
        }
    };
        
    return(
        <Content style={styles.content}>
            {signUpLoading ? (
                <Spinner />
            ) : (
                <>
                <Item style={styles.item}>
                <Input 
                    placeholder='First Name' 
                    onChangeText={(inFirstName) =>setFirstName(inFirstName)}
                />
            </Item>
            <Item style={styles.item}>
                <Input 
                    placeholder='Surname' 
                    onChangeText={(inSurname) =>setSurname(inSurname)}
                />                
            </Item>
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
            <Button primary block onPress={() => register()} style={styles.button}>
                <Text>Register!</Text>
            </Button>
                </>
            )}
        </Content>
    )
}

export default RegistrationScreen;