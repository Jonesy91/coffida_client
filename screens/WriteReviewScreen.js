import { Content, Text, H3, Textarea, Grid, Row, Button, Col, Toast } from 'native-base';
import React, { Component } from 'react';
import { StyleSheet, Image } from 'react-native'
import StarRating from 'react-native-star-rating';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { submitReview, addPhoto, getUser } from '../Utilities/APIUtility';
import { getUserId, getAuthToken } from '../Utilities/AsyncStorageUtil';

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
    setOverall(rating){
        this.setState({overallRating:rating});
    }
    setPrice(rating){
        this.setState({priceRating:rating});
    }
    setQuality(rating){
        this.setState({qualityRating:rating});
    }
    setClenliness(rating){
        this.setState({clenlinessRating:rating});
    }

    submitReview = async () => {
        const body = {
            overall_rating:parseInt(this.state.overallRating),
            price_rating:parseInt(this.state.priceRating),
            quality_rating:parseInt(this.state.qualityRating),
            clenliness_rating:parseInt(this.state.clenlinessRating),
            review_body:this.state.comments
        }
        const token = await getAuthToken()
        const id = this.props.route.params.locationId;
        submitReview(id,token,body)
            .then(() => {
                this.getReviewId()
                    .then(reviewId => {
                        addPhoto(
                            token, 
                            this.props.route.params.photo, 
                            this.props.route.params.locationId, 
                            reviewId
                        ).then(response => {
                            Toast.show({
                                text: 'Submitted review',
                                buttonText: 'Okay',
                                duration: 3000,
                                buttonStyle: { backgroundColor: '#4391ab'}
                            })
                        })
                    })

            })
            .then(() => {
                this.props.navigation.goBack();
            })
            .catch((error) => {
                Toast.show({
                    text: 'Failed to submit review',
                    buttonText: 'Okay',
                    duration: 3000,
                    buttonStyle: { backgroundColor: '#4391ab'}
                })
            })   
    }

    async getReviewId(){
        const userId = await getUserId();
        const token = await  getAuthToken();
        let reviewId = 0;
        await getUser(userId, token)
            .then((response) => {
                response.reviews.map(review => {
                    if(review.location.location_id === this.props.route.params.locationId){
                        if(review.review.review_id > reviewId){
                            reviewId = review.review.review_id;
                        }
                    }
                });

            })
        return reviewId;
    }

    // getAuthKey = async () => {
    //     try{
    //         const token = await AsyncStorage.getItem('@userKey');
    //         if(token !== null){
    //             return token;
    //         }
    //         else{
    //             throw error('Could not retrieve user key');
    //         }
    //     } catch (e) {
    //         console.log(e);
    //     }
    // }

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
                            rating={this.state.overallRating}
                            emptyStar={'ios-star-outline'}
                            fullStar={'ios-star'}
                            halfStar={'ios-star-half'}
                            iconSet={'Ionicons'}
                            fullStarColor="#16bff7"
                            emptyStarColor="#16bff7"
                            halfStarColor="#16bff7"
                            starSize={25}
                            halfStarEnabled={true}
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
                            rating={this.state.priceRating}
                            emptyStar={'ios-star-outline'}
                            fullStar={'ios-star'}
                            halfStar={'ios-star-half'}
                            iconSet={'Ionicons'}
                            fullStarColor="#16bff7"
                            emptyStarColor="#16bff7"
                            halfStarColor="#16bff7"
                            starSize={25}
                            halfStarEnabled={true}
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
                            rating={this.state.qualityRating}
                            emptyStar={'ios-star-outline'}
                            fullStar={'ios-star'}
                            halfStar={'ios-star-half'}
                            iconSet={'Ionicons'}
                            fullStarColor="#16bff7"
                            emptyStarColor="#16bff7"
                            halfStarColor="#16bff7"
                            starSize={25}
                            halfStarEnabled={true}
                            selectedStar={(rating) => this.setQuality(rating)}
                        />
                    </Row>
                    <Row style={styles.row}>
                        <Col style={styles.col}>
                            <Text>Clenliness</Text>
                        </Col>
                        <StarRating
                            maxStars={5}
                            rating={this.state.clenlinessRating}
                            emptyStar={'ios-star-outline'}
                            fullStar={'ios-star'}
                            halfStar={'ios-star-half'}
                            iconSet={'Ionicons'}
                            fullStarColor="#16bff7"
                            emptyStarColor="#16bff7"
                            halfStarColor="#16bff7"
                            starSize={25}
                            halfStarEnabled={true}
                            selectedStar={(rating) => this.setClenliness(rating)}
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
                        onPress={() => this.props.navigation.navigate('camera')}
                        style={styles.button}
                    >
                        <Text>Add a photo</Text>
                    </Button>
                    {this.props.route.params.photo && (<Image source={{uri:this.props.route.params.photo.uri}} style={styles.img} />)}
                    <Button 
                        block 
                        onPress={this.submitReview} 
                        style={styles.button}
                    >
                        <Text>Submit</Text>
                    </Button>    
                </Grid>
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
        marginVertical: 10,
        backgroundColor: '#4391ab'
    },
    img:{
        height:120, 
        width:120
    }
});

export default WriteReviewScreen;