import React, { Component } from 'react';
import { Text, Content, Grid, Row, Right } from 'native-base';
import ReviewCard from '../components/ReviewCard';
import IonIcons from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native-gesture-handler';

class Reviews extends Component {
   
    render(){
        return(
            <Content>
                {this.props.reviews.map((review) => (
                    <ReviewCard key={review.review_id} review={review} locationId={this.props.locationId}/>
                ))}
            </Content>
        )
    }
}

export default Reviews;