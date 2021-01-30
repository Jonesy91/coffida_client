import React, { Component } from 'react';
import { Text, Content, Left } from 'native-base';
import { Image, View } from 'react-native';
import IonIcons from 'react-native-vector-icons/Ionicons';
import StarRating from 'react-native-star-rating';
import Ratings from '../components/Ratings';
import ReviewCard from '../components/ReviewCard';

class ShopScreen extends Component{
    constructor(props){
        super(props)
        this.state={
            ratings:[]
        }
    }

    componentDidMount(){
        const overall = this.props.route.params.data.avg_overall_rating;
        const price = this.props.route.params.data.avg_price_rating;
        const quality = this.props.route.params.data.avg_quality_rating;
        const clenliness = this.props.route.params.data.avg_clenliness_rating;
        this.setState({ratings:
            {overall:overall, price:price, quality:quality, clenliness:clenliness}
        });
    }

    render(){
        let reviews = this.props.route.params.data.location_reviews;
        return(
            <Content>
                <Image source={{uri:this.props.route.params.data.photo_path}} style={{height: 250, width: null, flex: 1}}/>
                <Text>{this.props.route.params.data.location_name}</Text>
                <Text note>{this.props.route.params.data.location_town}</Text>
                <Text>Ratings</Text>
                <Ratings ratings={this.state.ratings}/> 
                <Text>Reviews</Text>     
                {reviews.map((review) => (
                    <ReviewCard key={review.review_id} review={review}/>
                ))}
            </Content>
        )
    };
}

export default ShopScreen;