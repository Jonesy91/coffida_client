/* eslint-disable react/jsx-filename-extension */
import { Content, Text, H3, Textarea, Grid, Row, Button } from 'native-base';
import React, { Component } from 'react';
import StarRating from 'react-native-star-rating';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { updateReview } from '../Utilities/APIUtility';

class UpdateReviewScreen extends Component{
    constructor(props){
        super(props)
        this.state={
            newComments:this.props.route.params.review.review_body,
            newOverallRating:this.props.route.params.review.overall_rating,
            newPriceRating:this.props.route.params.review.price_rating,
            newQualityRating:this.props.route.params.review.quality_rating,
            newClenlinessRating:this.props.route.params.review.clenliness_rating
        }
    }

    setOverall(rating){
        this.setState({newOverallRating:rating});
    }

    setPrice(rating){
        this.setState({newPriceRating:rating});
    }

    setQuality(rating){
        this.setState({newQualityRating:rating});
    }

    setClenliness(rating){
        this.setState({newClenlinessRating:rating});
    }

    updateReview() {
        const body = {
            overall_rating:parseInt(this.state.newOverallRating),
            price_rating:parseInt(this.state.newPriceRating),
            quality_rating:parseInt(this.state.newQualityRating),
            clenliness_rating:parseInt(this.state.newClenlinessRating),
            review_body:this.state.newComments
        }
        this.getAuthKey().then( token => {
            const locationId = this.props.route.params.locationId;
            const reviewId = this.props.route.params.review.review_id;
            updateReview(locationId,token,body, reviewId);
        });    
    }

    async getAuthKey() {
        try{
            const token = await AsyncStorage.getItem('@userKey');
            if(token !== null){
                return token;
            }
            
                throw error('Could not retrieve user key');
            
        } catch (e) {
            console.log(e);
        }
    }

    render(){
        return(
            <Content>
                <H3>Select a rating for each category</H3>
                <Grid>
                    <Row>
                        <Text>Overall</Text>
                        <StarRating
                            disabled={false}
                            maxStars={5}
                            rating={this.state.newOverallRating}
                            emptyStar="ios-star-outline"
                            fullStar="ios-star"
                            halfStar="ios-star-half"
                            iconSet="Ionicons"
                            fullStarColor="gold"
                            starSize={30}
                            halfStarEnabled
                            selectedStar={(rating) => this.setOverall(rating)}
                        />
                    </Row>
                    <Row>
                        <Text>Price</Text>
                        <StarRating
                            disabled={false}
                            maxStars={5}
                            rating={this.state.newPriceRating}
                            emptyStar="ios-star-outline"
                            fullStar="ios-star"
                            halfStar="ios-star-half"
                            iconSet="Ionicons"
                            fullStarColor="gold"
                            starSize={30}
                            halfStarEnabled
                            selectedStar={(rating) => this.setPrice(rating)}
                        />
                    </Row>
                    <Row>
                        <Text>Quality</Text>
                        <StarRating
                            disabled={false}
                            maxStars={5}
                            rating={this.state.newQualityRating}
                            emptyStar="ios-star-outline"
                            fullStar="ios-star"
                            halfStar="ios-star-half"
                            iconSet="Ionicons"
                            fullStarColor="gold"
                            starSize={30}
                            halfStarEnabled
                            selectedStar={(rating) => this.setQuality(rating)}
                        />
                    </Row>
                    <Row>
                        <Text>Clenliness</Text>
                        <StarRating
                            maxStars={5}
                            rating={this.state.newClenlinessRating}
                            emptyStar="ios-star-outline"
                            fullStar="ios-star"
                            halfStar="ios-star-half"
                            iconSet="Ionicons"
                            fullStarColor="gold"
                            starSize={30}
                            halfStarEnabled
                            selectedStar={(rating) => this.setClenliness(rating)}
                        />
                    </Row>
                </Grid>
                <H3>Comments</H3>
                <Textarea rowSpan={10} bordered defaultValue={this.state.newComments} onChangeText={(comment) => this.setState({newComments:comment})}/>
                <Button rounded onPress={() => {this.updateReview()}}><Text>Update</Text></Button>
            </Content>        
        )
    }
}

export default UpdateReviewScreen;