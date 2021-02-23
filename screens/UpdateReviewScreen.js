/* eslint-disable react/jsx-filename-extension */
import { Content, Text, H3, Textarea, Grid, Row, Button, Col, Toast } from 'native-base';
import React, { Component } from 'react';
import { Image } from 'react-native';
import StarRating from 'react-native-star-rating';
import { updateReview, addPhoto } from '../utilities/api/APIUtility';
import { getAuthToken } from '../utilities/asyncstorage/AsyncStorageUtil';
import styles from '../style/screens/ReviewScreenStyle';

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
            Toast.show({
                text: 'Review updated',
                buttonText: 'Okay',
                duration: 3000,
                buttonStyle: { backgroundColor: '#4391ab'}
            })
            navigation.navigate('shopScreen');
        })
        .catch((error) => {
            Toast.show({
                text: 'Failed update review',
                buttonText: 'Okay',
                duration: 3000,
                buttonStyle: { backgroundColor: '#4391ab'}
            })
        });    
    }

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