/* eslint-disable react/jsx-filename-extension */
import { Content, Text, H3, Textarea, Grid, Row, Button, Col } from 'native-base';
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
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
            const {locationId} = this.props.route.params;
            const reviewId = this.props.route.params.review.review_id;
            updateReview(locationId,token,body, reviewId)
                .then(() => {
                    Toast.show({
                        text: 'Review updated',
                        buttonText: 'Okay',
                        duration: 3000,
                        buttonStyle: { backgroundColor: '#4391ab'}
                    })
                    this.props.navigation.navigate('shopScreen');
                })
                .catch((error) => {
                    Toast.show({
                        text: 'Failed update review',
                        buttonText: 'Okay',
                        duration: 3000,
                        buttonStyle: { backgroundColor: '#4391ab'}
                    })
                })
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
            <Content style={styles.content}>
                <H3 style={styles.h3}>Select a rating for each category</H3>
                <Grid>
                    <Row style={styles.row}>
                        <Col style={styles.col}>
                            <Text>Overall</Text>
                        </Col>
                        <StarRating
                            disabled={false}
                            maxStars={5}
                            rating={this.state.newOverallRating}
                            emptyStar="ios-star-outline"
                            fullStar="ios-star"
                            halfStar="ios-star-half"
                            iconSet="Ionicons"
                            fullStarColor="#16bff7"
                            emptyStarColor="#16bff7"
                            halfStarColor="#16bff7"
                            starSize={20}
                            halfStarEnabled
                            selectedStar={(rating) => this.setOverall(rating)}
                        />
                    </Row>
                    <Row style={styles.row}>
                        <Col style={styles.col}>
                            <Text>Price</Text>
                        </Col>
                        <StarRating
                            disabled={false}
                            maxStars={5}
                            rating={this.state.newPriceRating}
                            emptyStar="ios-star-outline"
                            fullStar="ios-star"
                            halfStar="ios-star-half"
                            iconSet="Ionicons"
                            fullStarColor="#16bff7"
                            emptyStarColor="#16bff7"
                            halfStarColor="#16bff7"
                            starSize={20}
                            halfStarEnabled
                            selectedStar={(rating) => this.setPrice(rating)}
                        />
                    </Row>
                    <Row style={styles.row}>
                        <Col style={styles.col}>
                            <Text>Quality</Text>
                        </Col>
                        <StarRating
                            disabled={false}
                            maxStars={5}
                            rating={this.state.newQualityRating}
                            emptyStar="ios-star-outline"
                            fullStar="ios-star"
                            halfStar="ios-star-half"
                            iconSet="Ionicons"
                            fullStarColor="#16bff7"
                            emptyStarColor="#16bff7"
                            halfStarColor="#16bff7"
                            starSize={20}
                            halfStarEnabled
                            selectedStar={(rating) => this.setQuality(rating)}
                        />
                    </Row>
                    <Row style={styles.row}>
                        <Col style={styles.col}>
                            <Text>Clenliness</Text>
                        </Col>
                        <StarRating
                            maxStars={5}
                            rating={this.state.newClenlinessRating}
                            emptyStar="ios-star-outline"
                            fullStar="ios-star"
                            halfStar="ios-star-half"
                            iconSet="Ionicons"
                            fullStarColor="#16bff7"
                            emptyStarColor="#16bff7"
                            halfStarColor="#16bff7"
                            starSize={20}
                            halfStarEnabled
                            selectedStar={(rating) => this.setClenliness(rating)}
                        />
                    </Row>
                </Grid>
                <H3 style={styles.h3}>Comments</H3>
                <Textarea rowSpan={5} bordered defaultValue={this.state.newComments} onChangeText={(comment) => this.setState({newComments:comment})}/>
                <Button block onPress={() => {this.updateReview()}} style={styles.button}><Text>Update</Text></Button>
            </Content>        
        )
    }
}

const styles = StyleSheet.create({
    content:{
        backgroundColor: 'white',
        margin: 20
    },
    row: {
        margin: 5
    },
    col:{
        width: 150
    },
    h3: {
        margin: 5
    },
    button: {
        margin: 10,
        backgroundColor: '#4391ab'
    }
});

export default UpdateReviewScreen;