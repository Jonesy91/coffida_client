import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import ShopCard from '../components/ShopCard';

class HomeScreen extends Component{
    constructor(props){
        super(props);
        this.state={
            locations:[]
        }
    }
    componentDidMount = () => {
        fetch('http://192.168.0.77:3333/api/1.0.0/find',{
            headers:{
                'X-Authorization':'4376fe019d96c7c6faa597861b799786'
            }
        })
            .then(response => response.json())
            .then(data => this.setState({locations: data}))     
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