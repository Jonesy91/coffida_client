import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import ShopCard from '../components/ShopCard';
import AsyncStorage from '@react-native-async-storage/async-storage'

class HomeScreen extends Component{
    constructor(props){
        super(props);
        this.state={
            locations:[],
            authKey: ''
        }
    }

    getAuthKey = async () => {
        try{
            const token = await AsyncStorage.getItem('@userKey')
            if(token !== null){
                this.setState({authKey: token})
            }
            else{
                throw error('null object');
            }
        } catch (e) {
            console.log(e);
        }
        
        
    }
    
    componentDidMount = () => {
        this.getAuthKey().then(
            response => {
                const token = this.state.authKey;
                fetch('http://192.168.0.77:3333/api/1.0.0/find',{
                headers:{
                        'X-Authorization': token
                }
            })
            .then(response => response.json())
            .then(data => this.setState({locations: data}))
            }
        )
             
    }

    render(){
        return(
            <View>
                <FlatList
                    data={this.state.locations}
                    renderItem={({item}) => <ShopCard location={item}/>}
                />
            </View>
        );
    }
}

export default HomeScreen;