/* eslint-disable react/jsx-filename-extension */
import { Text, Item, Input, Button, Content } from 'native-base';
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
            setSignUpLoading(false);
            signIn(email,password).then(() => 
            dispatch({ type: 'SIGN_IN', token: data.token })
            );
        })
        .catch((err) => {
            setSignUpLoading(false);
        });
    };
        
    return(
        <Content style={styles.content}>
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