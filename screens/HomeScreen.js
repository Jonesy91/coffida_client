import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import ShopCard from '../components/ShopCard';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createStackNavigator } from '@react-navigation/stack';
import { Content } from 'native-base';

class HomeScreen extends Component{
    constructor(props){
        super(props);
        this.state={
            isLoading: true,
            locations:[],
            authKey: '',
            favLocations:[]
        }
    }
    
    componentDidMount = () => {
        this.findShops();
        this.getUser();
    }

    getUser = () => {
        this.getUserData().then(
            userData => {
                const token = userData.token;
                const userId = userData.id;
                fetch('http://10.0.2.2:3333/api/1.0.0/user/'+userId,{
                headers:{
                        'X-Authorization': token
                    }
                })
                .then(response => response.json())
                .then(data => {
                    const favlocations = data.favourite_locations.map(favourite => {
                        return favourite.location_id;
                    });
                    this.setState({favLocations:favlocations});
                });
            }
        )
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
    
    getUserData = async () => {
        const id = await AsyncStorage.getItem('@userId');
        const token = await AsyncStorage.getItem('@userKey');
        const data = {id:id,token:token};
        return data;
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

    openShop = (data, favourite) => {
        this.props.navigation.navigate('shopScreen', {data:data, favourite:favourite})
    }

    render(){
        return(
            <Content>
                {this.state.locations.map((location) => {
                    let favourite = false;
                    if(this.state.favLocations.includes(location.location_id)){
                        favourite=true;
                    }
                     return <TouchableOpacity key={location.location_id} onPress={() => this.openShop(location, favourite)}><ShopCard key={location.location_id} location={location} favourite={favourite}/></TouchableOpacity> 
                    }
                )}  
            </Content>  
        );
    }
}

export default HomeScreen;