import React, { Component } from 'react';
import { Item, Input, Button, Text, Body, View } from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity } from 'react-native-gesture-handler';
import RegistrationScreen from './RegistrationScreen';

class LogInScreen extends Component{
    constructor(props){
        super(props);
        this.state={
            email:'',
            password:'',
        }
    }
    
    logIn = async () => {
        let data = {email:this.state.email, password:this.state.password};
        const ressponse =await fetch('http://192.168.0.77:3333/api/1.0.0/user/login',{
            method: 'POST',
            headers: {
               'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const json = await ressponse.json();
        await this.storeResponse(json);
        this.props.navigation.navigate('home');
    }

    storeResponse = async  (value) => {
        try{
            await AsyncStorage.setItem('@userKey', value.token)
            await AsyncStorage.setItem('@userId',value.id.stringify)
        }catch(e){

        }
    }

    openRegistration = () => {
        this.props.navigation.navigate('registration');
    }
    
    render(){
        return(
            <>
            <Item rounded>
                <Input 
                    placeholder='Email' 
                    onChangeText={(email) =>this.setState({email: email})}
                />
            </Item>
            <Item rounded>
                <Input 
                    secureTextEntry
                    placeholder='Password' 
                    onChangeText={(password) =>this.setState({password: password})}/>                
            </Item>
            <Button rounded primary onPress={this.logIn}>
                <Text>Log In</Text>
            </Button>
            <View style={{flex:1, flexDirection: 'row'}}>
                <Text>Don't have an accout?</Text>
                <TouchableOpacity onPress={this.openRegistration}><Text style={{color: 'red'}}>Register</Text></TouchableOpacity>
            </View>
            </>
        );
    }
}

export default LogInScreen;