/* eslint-disable react/jsx-filename-extension */
import { Text, Item, Input, Button, Content, Spinner, Toast } from 'native-base';
import React, { useState } from 'react';
import { signUp } from '../utilities/auth/AuthService';
import { useAuthDispatch } from '../utilities/auth/AuthContext';
import styles from '../style/screens/RegistrationScreenStyle';

const RegistrationScreen = ({ navigation }) => {
    const [firstName, setFirstName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [signUpLoading, setSignUpLoading] = useState(false);
    const dispatch = useAuthDispatch();
    

    const register = async () => {
        setSignUpLoading(true);
        signUp(firstName,surname,email,password)
        .then((data) => {
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
            <Button primary block onPress={() => register()} style={styles.button}>
                <Text>Register!</Text>
            </Button>
                </>
            )}
        </Content>
    )
}

export default RegistrationScreen;