/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react';
import { Item, Input, Button, Text, View } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useAuthDispatch } from '../navigation/AuthContext';
import { signIn } from '../navigation/AuthService';

const LogInScreen = ({ navigation }) => {
    const dispatch = useAuthDispatch();
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [loading, setLoading] = useState(false);

    const requestLogIn = async () => {
        const data = {email, password};
        setLoading(true);
        try{
            signIn(data).then((json) => {
            dispatch({ type: 'SIGN_IN', token: json.token, id: json.id.toString() });
            })
        } catch(e){
            console.log(e);
        }
        finally{setLoading(false)}
    }
        
    return(
        <>
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
            <Button rounded primary onPress={() => requestLogIn()}>
                <Text>Log In</Text>
            </Button>
            <View style={{flex:1, flexDirection: 'row'}}>
                <Text>Don't have an accout?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('SignUp')}><Text style={{color: 'red'}}>Register</Text></TouchableOpacity>
            </View>
        </>
    );
}

export default LogInScreen;