/* eslint-disable react/jsx-filename-extension */
import { Text, Item, Input, Button } from 'native-base';
import React, { useState } from 'react';
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
        <>
            <Item rounded>
                <Input 
                    placeholder='First Name' 
                    onChangeText={(inFirstName) =>setFirstName(inFirstName)}
                />
            </Item>
            <Item rounded>
                <Input 
                    placeholder='Surname' 
                    onChangeText={(inSurname) =>setSurname(inSurname)}
                />                
            </Item>
            <Item rounded>
                <Input 
                    placeholder='Email' 
                    onChangeText={(inEmail) =>setEmail(inEmail)}
                />                
            </Item>
            <Item rounded>
                <Input 
                    secureTextEntry
                    placeholder='Password' 
                    onChangeText={(inPassword) =>setPassword(inPassword)}
                />                
            </Item>
            <Button rounded primary onPress={() => register()}>
                <Text>Register!</Text>
            </Button>
        </>
    )
}

export default RegistrationScreen;