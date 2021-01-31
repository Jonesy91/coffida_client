import React, { Component } from 'react';
import { Text, Content, Grid, Row, Right } from 'native-base';
import ReviewCard from '../components/ReviewCard';
import IonIcons from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native-gesture-handler';

class Reviews extends Component {
    
    openWriteReview = () => {
        this.props.navigation.navigate('writeReview', {locationId:this.props.locationId});
    }

    render(){
        return(
            <Content>
                <Grid>
                    <Row>
                    <Text>Reviews</Text>
                    <Right>
                        <TouchableOpacity onPress={this.openWriteReview}>
                            <IonIcons name='md-add' size={30} color='black'/>     
                        </TouchableOpacity>
                    </Right>
                    </Row>
                    {this.props.reviews.map((review) => (
                        <ReviewCard key={review.review_id} review={review}/>
                    ))}
                </Grid>
            </Content>
        )
    }
}

export default Reviews;