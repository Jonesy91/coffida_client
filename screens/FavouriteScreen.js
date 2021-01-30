import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { FlatList } from 'react-native-gesture-handler';
import ShopCard from '../components/ShopCard';
import AsyncStorage from '@react-native-async-storage/async-storage'

class FavouriteScreen extends Component{
    constructor(props){
        super(props)
        this.state={
            isLoading: true,
            favourites:[]
        }
    }

    componentDidMount(){
        this.getFavourites();
    }
 
    getFavourites = () => {
        this.getUserData().then(
            userData => {
                fetch('http://10.0.2.2:3333/api/1.0.0/user/1',{
                headers:{
                        method: 'GET',
                        'X-Authorization': userData.token
                    }
                })
                .then(response => response.json())
                .then(data => {
                    const favourites = data.favourite_locations.map((favourite) =>  {
                        favourite.id=favourite.location_id.toString();
                        return favourite
                    })
                    this.setState({
                        isLoading:false,
                        favourites:data.favourite_locations
                    })
                })
                console.log(this.state.favourites)
            }
        )
    }   

    getUserData = async () => {
        const id = await AsyncStorage.getItem('@userId');
        const token = await AsyncStorage.getItem('@userKey');
        const data = {id:id,token:token};
        return data;
    }

    openShop = (data) => {
        this.props.navigation.navigate('shopScreen', {data:data})
    }

    render(){
        return(
            <View>
                <FlatList
                    data={this.state.favourites}
                    renderItem={({item}) => <TouchableOpacity onPress={() => this.openShop(item)}><ShopCard location={item}/></TouchableOpacity>}
                />
            </View>
       );
    }
}

export default FavouriteScreen;