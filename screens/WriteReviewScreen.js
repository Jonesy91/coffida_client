/* eslint-disable react/jsx-filename-extension */
import { Content, Text, H3, Textarea, Grid, Row, Button, Col, Toast } from 'native-base';
import React, { Component } from 'react';
import { Image } from 'react-native';
import StarRating from 'react-native-star-rating';
import { submitReview, addPhoto, getUser } from '../utilities/api/APIUtility';
import { getUserId, getAuthToken } from '../utilities/asyncstorage/AsyncStorageUtil';
import styles from '../style/screens/ReviewScreenStyle';
import { displayMessage } from '../utilities/error/errorHandler';

/* 
The write review screen provides users with the ability to write a new review. Users can leaves ratings,
comments and upload a photo.
*/
class WriteReviewScreen extends Component{
    constructor(props){
        super(props)
        this.state={
            comments:'',
            overallRating:0,
            priceRating:0,
            qualityRating:0,
            clenlinessRating:0,
        }
    }

    /* 
    This function will handle th requests to upload a new review. On success the 
    function will navigate to the previous screen which will be the shop screen.
    */
    async handleSubmit() {
        try{
            const body = {
                overall_rating:parseInt(this.state.overallRating),
                price_rating:parseInt(this.state.priceRating),
                quality_rating:parseInt(this.state.qualityRating),
                clenliness_rating:parseInt(this.state.clenlinessRating),
                review_body:this.state.comments
            }
            const token = await getAuthToken();
            const id = this.props.route.params.locationId;
            await submitReview(id,token,body)            
            if(this.props.route.params.photo){
                const reviewId = await this.getReviewId();
                await addPhoto(
                    token, 
                    this.props.route.params.photo, 
                    this.props.route.params.locationId, 
                    reviewId
                )
            }
            displayMessage('Review submitted');
            this.props.navigation.goBack();
        } catch(error){
            if (error === 401 || error === 403) {
                displayMessage('You don\'t have permission to write reviews');
            } else {
                displayMessage('Failed to add a review');
            }
        }

    }

    /* 
    The function gets the reviewd id of the new review once it has been uploaded. This id 
    will then be used to make the request to upload a photo.
    */
    async getReviewId(){
        const { route } = this.props;
        const userId = await getUserId();
        const token = await  getAuthToken();
        let reviewId = 0;
        await getUser(userId, token)
            .then((response) => {
                response.reviews.map(review => {
                    if(review.location.location_id === route.params.locationId){
                        if(review.review.review_id > reviewId){
                            reviewId = review.review.review_id;
                        }
                    }
                });

            })
            .catch(error => {
                if(error === 404){
                    displayMessage('Unable to find user');
                } else {
                    displayMessage('Failed to get user data');
                }
            })
        return reviewId;
    }

    render(){
        const { overallRating, qualityRating, priceRating, clenlinessRating} = this.state;
        const { navigation, route } = this.props;
        const starColour = "#16bff7";
        const emptyStar="md-star-outline"
        const fullStar="md-star"
        const halfStar="md-star-half"
        const iconSet="Ionicons"
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
                            rating={overallRating}
                            emptyStar={emptyStar}
                            fullStar={fullStar}
                            halfStar={halfStar}
                            iconSet={iconSet}
                            fullStarColor={starColour}
                            emptyStarColor={starColour}
                            halfStarColor={starColour}
                            starSize={25}
                            halfStarEnabled
                            selectedStar={(rating) => this.setState({overallRating:rating})}
                        />
                    </Row>
                    <Row style={styles.row}>
                        <Col style={styles.col}>
                            <Text>Price</Text>
                        </Col>
                        <StarRating
                            disabled={false}
                            maxStars={5}
                            rating={priceRating}
                            emptyStar={emptyStar}
                            fullStar={fullStar}
                            halfStar={halfStar}
                            iconSet={iconSet}
                            fullStarColor={starColour}
                            emptyStarColor={starColour}
                            halfStarColor={starColour}
                            starSize={25}
                            halfStarEnabled
                            selectedStar={(rating) => this.setState({priceRating:rating})}
                        />
                    </Row>
                    <Row style={styles.row}>
                        <Col style={styles.col}>
                            <Text>Quality</Text>    
                        </Col>
                        <StarRating
                            disabled={false}
                            maxStars={5}
                            rating={qualityRating}
                            emptyStar={emptyStar}
                            fullStar={fullStar}
                            halfStar={halfStar}
                            iconSet={iconSet}
                            fullStarColor={starColour}
                            emptyStarColor={starColour}
                            halfStarColor={starColour}
                            starSize={25}
                            halfStarEnabled
                            selectedStar={(rating) => this.setState({qualityRating:rating})}
                        />
                    </Row>
                    <Row style={styles.row}>
                        <Col style={styles.col}>
                            <Text>Clenliness</Text>
                        </Col>
                        <StarRating
                            maxStars={5}
                            rating={clenlinessRating}
                            emptyStar={emptyStar}
                            fullStar={fullStar}
                            halfStar={halfStar}
                            iconSet={iconSet}
                            fullStarColor={starColour}
                            emptyStarColor={starColour}
                            halfStarColor={starColour}
                            starSize={25}
                            halfStarEnabled
                            selectedStar={(rating) => this.setState({clenlinessRating:rating})}
                        />
                    </Row>
                    <H3 style={styles.h3}>Comments</H3>
                    <Textarea 
                        rowSpan={5} 
                        bordered 
                        placeholder="Add a comment" 
                        onChangeText={(comment) => this.setState({comments:comment})}
                    />
                    <Button
                        block
                        onPress={() => navigation.navigate('camera',{ caller:route.name })}
                        style={styles.button}
                    >
                        <Text>Add a photo</Text>
                    </Button>
                    {route.params.photo && (<Image source={{uri:route.params.photo.uri}} style={styles.image} />)}
                    <Button 
                        block 
                        onPress={() => this.handleSubmit()} 
                        style={styles.button}
                    >
                        <Text>Submit</Text>
                    </Button>    
                </Grid>
            </Content>        
        )
    }
}

export default WriteReviewScreen;