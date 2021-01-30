import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import ShopCard from '../components/ShopCard';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createStackNavigator } from '@react-navigation/stack';



class HomeScreen extends Component{
    constructor(props){
        super(props);
        this.state={
            isLoading: true,
            locations:[],
            authKey: ''
        }
    }
    
    componentDidMount = () => {
        this.findShops();
    }

    findShops = () => {
        this.getAuthKey().then(
            response => {
                const token = this.state.authKey;
                fetch('http://10.0.2.2:3333/api/1.0.0/find',{
                headers:{
                        'X-Authorization': token
                    }
                })
                .then(response => response.json())
                .then(data => {
                    const locationResp = data.map((item) => {
                        item.id=item.location_id.toString();
                        return item;
                    })
                    this.setState({
                        isLoading: false,    
                        locations: locationResp
                    });
                });
            }
        )
    }
    
    getAuthKey = async () => {
        try{
            const token = await AsyncStorage.getItem('@userKey');
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

    openShop = (data) => {
        this.props.navigation.navigate('shopScreen', {data:data})
    }

    render(){
        return(
            <View>
                <FlatList
                    data={this.state.locations}
                    renderItem={({item}) => <TouchableOpacity onPress={() => this.openShop(item)}><ShopCard location={item}/></TouchableOpacity>}
                />
            </View>
        );
    }
}

export default HomeScreen;