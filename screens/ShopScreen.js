/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import { Text, Content, Row, Grid, Right, H1, H2, Icon, Button, Toast, Spinner, Col } from 'native-base';
import { Image } from 'react-native';
import Ratings from '../components/Ratings';
import Reviews from '../components/Reviews';
import { getLocation, favourite, unFavourite, getUser } from '../utilities/api/APIUtility';
import { getAuthToken, getUserId } from '../utilities/asyncstorage/AsyncStorageUtil';
import styles from '../style/screens/ShopScreenStyle';
import { displayMessage } from '../utilities/error/errorHandler';

class ShopScreen extends Component{
    constructor(props){
        super(props)
        this.state={
            ratings:{
                overall:null, 
                price:null, 
                quality:null,
                clenliness:null
            },
            locationId:this.props.route.params.locationId,
            locationData: '',
            isFavourite: this.props.route.params.favourite,
            userReviews: '',
            reviews: '',
            likedReviews: '',
            isLoading: true,
            dataLoaded: false,
        }
    }

    componentDidMount() {
        const { navigation } = this.props;
        this.focusListener = navigation.addListener('focus', () => {
            this.getData();
        });
    }

    componentWillUnmount() {
        this.focusListener();
    }

    async getData(){
        this.setState({dataLoaded:false,isLoading:true})
        await this.getShopData();
        await this.getUserInfo();
        this.setState({dataLoaded:true, isLoading:false})
    }

    async getShopData() {
        const { locationId } = this.state;
        const token = await getAuthToken();
        getLocation(locationId, token).then(data => {
            this.setState({
                reviews: data.location_reviews,
                locationData: data,
                ratings:{
                    overall:data.avg_overall_rating, 
                    price:data.avg_price_rating, 
                    quality:data.avg_quality_rating,
                    clenliness:data.avg_clenliness_rating
                }
            });
        })
        .catch(error => {
            if(error.status === 404){
                displayMessage('location not found');
            } else {
                displayMessage('Failed to get location');
            }
        })
    } 

    async getUserInfo() {
        const token = await getAuthToken();
        const userId = await getUserId();
        try{
            const userData = await getUser(userId,token)
            const { locationId } = this.state;
            const likedReviews = userData.liked_reviews.filter(review =>
            review.location.location_id === locationId
            );
            const reviewIds = likedReviews.map(review => review.review.review_id);
            this.setState({likedReviews:reviewIds});
            const userReviews = userData.reviews.filter(review =>
            review.location.location_id === locationId
            );
            const reviewIdss = userReviews.map(review => review.review.review_id);
            this.setState({userReviews: reviewIdss, error:false});
        } catch (error){
            this.setState({error:true});
            displayMessage('Failed to get user data');
        }
        
        
    }

    favouriteLocation() {
        const { locationId, isFavourite,  } = this.state;
        getAuthToken()
            .then(token => {
                if(isFavourite === false){
                    favourite(locationId, token)
                        .then(this.setState({isFavourite:true}))
                        .catch(error => {
                            this.setState({isFavourite:false})
                            displayMessage('Failed to add shop to your favourites')
                        })
                } else{
                    unFavourite(locationId, token)
                        .then(this.setState({isFavourite:false}))
                        .catch(error => {
                            displayMessage('Failed to remove shop from your favourites')
                        })
                }   
            })
    }

    isFavourite() {
        let iconName;
        const { isFavourite } = this.state;
        if(isFavourite === true){
            iconName='md-bookmark'
        }else{
            iconName='md-bookmark-outline'
        }
        return iconName
    }

    openWriteReview() {
        const { navigation } = this.props;
        const { locationId } = this.state;
        navigation.navigate('writeReview', {locationId});
    }

    render(){
        const { isLoading, locationData, ratings, reviews, locationId, likedReviews, userReviews, dataLoaded } = this.state;
        return(
            <Content style={styles.content}>
                {isLoading ? (
                        <Spinner />
                    ) :
                    <>
                        <Image source={{uri:locationData.photo_path}} style={styles.image}/>
                        <Grid  style={styles.grid}>
                            <Row>
                                <Grid style={styles.grid}>
                                    <Row>
                                    <Col>
                                        <H1>{locationData.location_name}</H1>
                                        <Text>{locationData.location_town}</Text>
                                    </Col>
                                    <Col style={styles.col}>
                                        <Row>
                                        <Button style={styles.favBtn} onPress={() => {this.favouriteLocation()}}>
                                            <Icon name={this.isFavourite()} style={styles.icon} />
                                        </Button>
                                        </Row>
                                        
                                    </Col>
                                    </Row>
                                </Grid>
                            </Row>   
                            <Grid style={styles.ratingGrid}>
                                <Row>
                                    <H2>Ratings</H2>
                                </Row>
                                <Row> 
                                    <Ratings ratings={ratings}/> 
                                </Row>
                            </Grid>
                            <Row style={styles.row}>
                                <H2>Reviews</H2>
                                <Right>
                                    <Button primary small onPress={() => this.openWriteReview()} style={styles.button}><Text>Leave a review</Text></Button>
                                </Right>
                            </Row>
                            <Row style={styles.row}>
                                {dataLoaded === true && 
                                    <Reviews reviews={reviews} locationId={locationId} likes={likedReviews} navigation={this.props.navigation} userReviews={userReviews} />
                                }
                            </Row>
                        </Grid>
                    </>
                }
            </Content>
        )
    };
}

export default ShopScreen;