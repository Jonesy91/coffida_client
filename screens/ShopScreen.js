import React, { Component } from 'react';
import { Text, Content, Left } from 'native-base';
import { Image, View } from 'react-native';
import IonIcons from 'react-native-vector-icons/Ionicons';
import StarRating from 'react-native-star-rating';
import Ratings from '../components/Ratings';
import ReviewCard from '../components/ReviewCard';
import Reviews from '../components/Reviews';

class ShopScreen extends Component{
    constructor(props){
        super(props)
        this.state={
            ratings:[]
        }
    }

    componentDidMount(){
        this.setState({ratings:{
            overall:this.props.route.params.data.avg_overall_rating, 
            price:this.props.route.params.data.avg_price_rating, 
            quality:this.props.route.params.data.avg_quality_rating,
            clenliness:this.props.route.params.data.avg_clenliness_rating}
        });
    }

    render(){
        return(
            <Content>
                <Image source={{uri:this.props.route.params.data.photo_path}} style={{height: 250, width: null, flex: 1}}/>
                <Text>{this.props.route.params.data.location_name}</Text>
                <Text note>{this.props.route.params.data.location_town}</Text>
                <Text>Ratings</Text>
                <Ratings ratings={this.state.ratings}/> 
                <Reviews reviews={this.props.route.params.data.location_reviews} locationId={this.props.route.params.data.location_id} navigation={this.props.navigation}/>
            </Content>
        )
    };
}

export default ShopScreen;