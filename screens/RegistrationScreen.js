/* eslint-disable react/jsx-filename-extension */
import { Text, Item, Input, Button, Content, Spinner, Toast } from 'native-base';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native'; 
import { signIn, signUp, confirmSignUp } from '../navigation/AuthService';
import { useAuthDispatch } from '../navigation/AuthContext';

const RegistrationScreen = ({ navigation }) => {
    const [firstName, setFirstName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [signed, setSigned] = useState(false);
    const [signUpLoading, setSignUpLoading] = useState(false);
    const [verifyLoading, setVerifyLoading] = useState(false);
    const [code, setCode] = useState('');
    const dispatch = useAuthDispatch();
    

    const register = async () => {
        setSignUpLoading(true);
        signUp(firstName,surname,email,password)
        .then((data) => {
            setSigned(true);
            dispatch({ type: 'REGISTER', token: data.userId })
            Toast.show({
                text: 'Account created!',
                duration: 3000
            })
            setSignUpLoading(false);
            navigation.navigate('SignIn');
        })
        .catch((error) => {
            if(error.status === 400){
                Toast.show({
                    text: 'Please check your password and email are valid',
                    buttonText: 'Okay',
                    duration: 3000,
                    buttonStyle: { backgroundColor: '#4391ab'}
                })
            } else {
                Toast.show({
                    text: 'Please check your password and email are valid',
                    buttonText: 'Okay',
                    duration: 3000,
                    buttonStyle: { backgroundColor: '#4391ab'}
                })
            }
            
        })
        .finally(() => setSignUpLoading(false));
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
            <Button block onPress={() => register()} style={styles.button}>
                <Text>Register!</Text>
            </Button>
                </>
            )}
        </Content>
    )
}

const styles = StyleSheet.create({
    content:{
        backgroundColor: 'white',
        margin: 20,
        marginTop: 100
    },
    button:{
        backgroundColor:'#4391ab',
        margin: 10
    },
    item:{
        margin:10
    }
});

export default RegistrationScreen;