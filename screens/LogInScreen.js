import React, { Component } from 'react';
import { Item, Input, Button, Text, Body, View } from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity } from 'react-native-gesture-handler';
import RegistrationScreen from './RegistrationScreen';

class LogInScreen extends Component{
    constructor(props){
        super(props);
        this.state={
            isLoading: false,
            email:'',
            password:'',
        }
    }


    componentDidMount(){
       this.unsubscribe = this.props.navigation.addListener('focus', () => {
           this.checkLoggedIn();
       })
    }

    checkLoggedIn = async () => {
        try{
            const token = await AsyncStorage.getItem('@userKey');
            if(token !== null){
                this.props.navigation.navigate('home');
            }            
        } catch (e){

        }
    }
    
    
    requestLogIn = async () => {
        let data = {email:this.state.email, password:this.state.password};
        const ressponse = await fetch('http://10.0.2.2:3333/api/1.0.0/user/login',{
            method: 'POST',
            headers: {
               'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const json = await ressponse.json();
        await this.storeResponse(json);
    }

    logIn = async () => {
        this.setState({isLoading: true});
        await this.requestLogIn();
        this.setState({isLoading: false});
        this.props.navigation.navigate('home');
    }

    storeResponse = async  (value) => {
        try{
            const id = value.id.toString();
            await AsyncStorage.setItem('@userKey', value.token)
            await AsyncStorage.setItem('@userId',id)
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