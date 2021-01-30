import { View, Item, Input, Button } from 'native-base';
import React, { Component} from 'react';
import { Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

class RegistrationScreen extends Component{
    constructor(props){
        super(props);
        this.state={
            firstName:'',
            surname:'',
            email:'',
            password:''
        }
    }

    goToMainScreen = () => {
        this.props.navigation.navigate('home')
    }

    register = async () => {
        let data = {first_name:this.state.firstName, last_name:this.state.surname, email:this.state.email, password:this.state.password};
        const response =await fetch('http://192.168.0.77:3333/api/1.0.0/user',{
            method: 'POST',
            headers: {
               'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });        
        this.logIn();
    }

    logIn = async () => {
        let data = {email:this.state.email, password:this.state.password};
        const ressponse =await fetch('http://10.0.2.2:3333/api/1.0.0/user/login',{
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

    render(){
        return(
            <>
                <Item rounded>
                    <Input 
                        placeholder='First Name' 
                        onChangeText={(firstName) =>this.setState({firstName: firstName})}
                    />
                </Item>
                <Item rounded>
                    <Input 
                        placeholder='Surname' 
                        onChangeText={(surname) =>this.setState({surname: surname})}
                    />                
                </Item>
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
                        onChangeText={(password) =>this.setState({password: password})}
                    />                
                </Item>
                <Button rounded primary onPress={this.register}>
                    <Text>Register!</Text>
                </Button>
            </>
        )
    }
}

export default RegistrationScreen;