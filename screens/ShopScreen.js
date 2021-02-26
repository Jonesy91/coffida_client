/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import { Text, Content, Row, Grid, Right, H1, H2, Icon, Button, Toast, Spinner, Col } from 'native-base';
import { Image } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import Ratings from '../components/Ratings';
import Reviews from '../components/Reviews';
import { getLocation, favourite, unFavourite, getUser } from '../utilities/api/APIUtility';
import { getAuthToken, getUserId } from '../utilities/asyncstorage/AsyncStorageUtil';
import styles from '../style/screens/ShopScreenStyle';
import { displayMessage } from '../utilities/error/errorHandler';
import { calculateDistance } from '../utilities/location/LocationUtility';

/* 
The shop screen renders the data about a shop including the reviews for the location.
Here users can add a shop to their favourites and interact with reviews.
*/
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
            distance: 0,
            devLocation: null
        }
    }

    /* 
    When the component mounts a listener is added to check if the component is focused
    and requests the data to render.
    */
    componentDidMount() {
        const { navigation } = this.props;
        this.focusListener = navigation.addListener('focus', () => {
            this.getData();
        });
    }

    componentWillUnmount() {
        this.focusListener();
    }

    /* 
    Makes the requests required to render the data about a shop.
    - the shops data
    - the users data (favourites,likes and reviews)
    - the distance between the user and the shop
    */
    async getData(){
        this.setState({dataLoaded:false,isLoading:true})
        await this.getShopData();
        await this.getUserInfo();
        await this.getDistance();
        this.setState({dataLoaded:true, isLoading:false})
    }

    /* 
    Handles the api reqeust to get the data about a shop
    */
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
    
    /* 
    Retrieves the users lcoation and the distance between the user and the shop.
    */
    getDistance() {
        const { locationData } = this.state;
        Geolocation.getCurrentPosition((position) => {
            const { longitude, latitude } = position.coords;
            const location = {latitude, longitude};
            this.setState({devLocation:location});
            const resultDistance = calculateDistance(
                {latitude:location.latitude, longitude:location.longitude},
                {latitude:locationData.latitude, longitude:locationData.longitude},
              )
              this.setState({distance:resultDistance.toFixed(2)});
            }, (error) => 
                error
            , {
                enableHighAccuracy: true,
                timeout: 20000,
                maximumAge: 1000
            });
    }

    /* 
    
    Get the users data to check if the shop is one of the users favourites, what reviews
    the user has liked and which reviews belong to the user to proivde extra functionality like
    being able to update a review.
    */
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

    /* 
    Checks to see if the shop has an image to display if not a default image is used.
    */
    getImage() {
        const { locationData } = this.state;
        let { photo_path = '' } = locationData;
        if(photo_path === ''){
          return <Image source={require('../resources/images/SD-default-image.png')} style={styles.image} />
        }
        return <Image source={{ uri: photo_path }} style={styles.image} />
    }

    /* 
    Checks whether the shop is a favourite
    */
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

    /* 
    This function is called when the user presses the favourite button. This will make 
    the api request to either add or remove the shop from the users favourites.
    */
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

    /* 
    Handles the nvaigation to the writereview screen where users can create a new review.
    */
    openWriteReview() {
        const { navigation } = this.props;
        const { locationId } = this.state;
        navigation.navigate('writeReview', {locationId});
    }

    render(){
        const { isLoading, locationData, ratings, reviews, locationId, likedReviews, userReviews, dataLoaded, distance } = this.state;
        return(
            <Content style={styles.content}>
                {isLoading ? (
                        <Spinner />
                    ) :
                    <>
                        {this.getImage()}
                        <Grid  style={styles.grid}>
                            <Row>
                                <Grid style={styles.grid}>
                                    <Row>
                                    <Col>
                                        <H1>{locationData.location_name}</H1>
                                        <Text>{locationData.location_town}</Text>
                                        <Text>{`${distance} km`}</Text>
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