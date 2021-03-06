/* eslint-disable react/jsx-filename-extension */
import { Content, Text, H3, Textarea, Grid, Row, Button, Col, Toast } from 'native-base';
import React, { Component } from 'react';
import { Image } from 'react-native';
import StarRating from 'react-native-star-rating';
import { updateReview, addPhoto } from '../utilities/api/APIUtility';
import { getAuthToken } from '../utilities/asyncstorage/AsyncStorageUtil';
import styles from '../style/screens/ReviewScreenStyle';
import { displayMessage } from '../utilities/error/errorHandler';


/* 
The update review screen is displayed to users when they want to update one of their
existing reviews. Here users can change their ratings, comments and photos.
*/
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

    /* 
    Handles the requests to update a review and will navigate the user back to the shop screen on success.. 
    */
    updateReview() {
        const { newOverallRating, newQualityRating, newPriceRating, newClenlinessRating, newComments} = this.state; 
        const { navigation, route }  = this.props;
        const body = {
            overall_rating:parseInt(newOverallRating),
            price_rating:parseInt(newPriceRating),
            quality_rating:parseInt(newQualityRating),
            clenliness_rating:parseInt(newClenlinessRating),
            review_body:newComments
        }
        getAuthToken().then(async (token) => {
            const { locationId, photo } = route.params;
            const reviewId = route.params.review.review_id;
            await updateReview(locationId,token,body, reviewId)
            if(photo){
                await addPhoto(
                    token, 
                    photo, 
                    locationId, 
                    reviewId
                )
            }
           displayMessage('Review updated');
            navigation.navigate('shopScreen');
        })
        .catch((error) => {
            if(error === 404){
                displayMessage('Unable to find the requested review');
            } else if (error === 401 || error === 403) {
                displayMessage('You don\'t have permission to update this review');
            } else {
                displayMessage('Failed to update review');
            }
            
        });    
    }

    /* 
    Handles the navigation to the camera screen when the user wants to 
    add a photo.
    */
    openCamera(){
        const { navigation, route } = this.props;
        const { locationId } = route.params;
        navigation.navigate('camera', { caller:route.name, locationId });
    }


    render(){
        const { newOverallRating, newPriceRating, newQualityRating, newClenlinessRating, newComments} = this.state;
        const { route }  = this.props;
        const { locationId, photo = null } = route.params;
        const reviewId = route.params.review.review_id;
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
                            rating={newOverallRating}
                            emptyStar="ios-star-outline"
                            fullStar="ios-star"
                            halfStar="ios-star-half"
                            iconSet="Ionicons"
                            fullStarColor="#16bff7"
                            emptyStarColor="#16bff7"
                            halfStarColor="#16bff7"
                            starSize={20}
                            halfStarEnabled
                            selectedStar={(rating) => this.setState({newOverallRating:rating})}
                        />
                    </Row>
                    <Row style={styles.row}>
                        <Col style={styles.col}>
                            <Text>Price</Text>
                        </Col>
                        <StarRating
                            disabled={false}
                            maxStars={5}
                            rating={newPriceRating}
                            emptyStar="ios-star-outline"
                            fullStar="ios-star"
                            halfStar="ios-star-half"
                            iconSet="Ionicons"
                            fullStarColor="#16bff7"
                            emptyStarColor="#16bff7"
                            halfStarColor="#16bff7"
                            starSize={20}
                            halfStarEnabled
                            selectedStar={(rating) => this.setState({newPriceRating:rating})}
                        />
                    </Row>
                    <Row style={styles.row}>
                        <Col style={styles.col}>
                            <Text>Quality</Text>
                        </Col>
                        <StarRating
                            disabled={false}
                            maxStars={5}
                            rating={newQualityRating}
                            emptyStar="ios-star-outline"
                            fullStar="ios-star"
                            halfStar="ios-star-half"
                            iconSet="Ionicons"
                            fullStarColor="#16bff7"
                            emptyStarColor="#16bff7"
                            halfStarColor="#16bff7"
                            starSize={20}
                            halfStarEnabled
                            selectedStar={(rating) => this.setState({newQualityRating:rating})}
                        />
                    </Row>
                    <Row style={styles.row}>
                        <Col style={styles.col}>
                            <Text>Clenliness</Text>
                        </Col>
                        <StarRating
                            maxStars={5}
                            rating={newClenlinessRating}
                            emptyStar="ios-star-outline"
                            fullStar="ios-star"
                            halfStar="ios-star-half"
                            iconSet="Ionicons"
                            fullStarColor="#16bff7"
                            emptyStarColor="#16bff7"
                            halfStarColor="#16bff7"
                            starSize={20}
                            halfStarEnabled
                            selectedStar={(rating) => this.setState({newClenlinessRating:rating})}
                        />
                    </Row>
                </Grid>
                <H3 style={styles.h3}>Comments</H3>
                <Textarea rowSpan={5} bordered defaultValue={newComments} onChangeText={(comment) => this.setState({newComments:comment})}/>
                {/* 
                renders an image component. on render the first image component will be rendered which makes the request to GET a photo,
                if the users has taken a different photo the second component is rendered instead to show the phot which will be uploaded.    
                */}
                {photo === null ? (
                    <Image style={styles.image} source={{uri:`http://10.0.2.2:3333/api/1.0.0/location/${locationId}/review/${reviewId}/photo?timestamp=${Date.now()}`}}/>
                ) : (
                    <Image style={styles.image} source={{uri:photo.uri}}/>
                )}
                <Button block onPress={() => {this.openCamera()}} style={styles.button}><Text>Change Photo</Text></Button>
                <Button block onPress={() => {this.updateReview()}} style={styles.button}><Text>Update</Text></Button>
            </Content>        
        )
    }
}

export default UpdateReviewScreen;