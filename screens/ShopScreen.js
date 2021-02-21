/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import { Text, Content, Row, Grid, Right, H1, H2, Icon, Button, Toast, Spinner } from 'native-base';
import { Image, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Ratings from '../components/Ratings';
import Reviews from '../components/Reviews';
import { getLocation, favourite, unFavourite, getUser, like } from '../Utilities/APIUtility';
import { getAuthToken, getUserId } from '../Utilities/AsyncStorageUtil';

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
            isLoading: true
        }
    }

    componentDidMount() {
        this.focusListener = this.props.navigation.addListener('focus', () => {
            this.getShopData();
            this.getUserInfo();
        });
    }

    componentWillUnmount() {
        this.focusListener;
    }

    openWriteReview() {
        this.props.navigation.navigate('writeReview', {locationId:this.state.locationId});
    }

    isFavourite() {
        let iconName;
        if(this.state.isFavourite === true){
            iconName='md-bookmark'
        }else{
            iconName='md-bookmark-outline'
        }
        return iconName
    }

    favouriteLocation() {
        getAuthToken()
            .then(token => {
                if(this.state.isFavourite === false){
                    favourite(this.state.locationId, token)
                        .then(this.setState({isFavourite:true}))
                        .catch(error => {
                            this.setState({isFavourite:false})
                            Toast.show({
                                text: 'Failed to add shop to your favourites',
                                buttonText: 'Okay',
                                duration: 3000,
                                buttonStyle: { backgroundColor: '#4391ab'}
                            })
                        })
                } else{
                    unFavourite(this.state.locationId, token)
                        .then(this.setState({isFavourite:false}))
                        .catch(error => {
                            Toast.show({
                                text: 'Failed to remove shop from your favourites',
                                buttonText: 'Okay',
                                duration: 3000,
                                buttonStyle: { backgroundColor: '#4391ab'}
                            })
                        })
                }   
            })
    }

    async getShopData() {
        this.setState({isLoading:true})
        const token = await getAuthToken();
        getLocation(this.state.locationId, token).then(data => {
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
            let message = '';
            if(error.status === 404){
                message = 'Unable to find the shop requested';
            } else {
                message = 'Request failed'
            }
            Toast.show({
                text: message,
                buttonText: 'Okay',
                duration: 3000,
                buttonStyle: { backgroundColor: '#4391ab'}
           })
        })
        .finally(() => this.setState({isLoading:false}))
    } 

    async getUserInfo() {
        this.setState({isLoading:true});
        const token = await getAuthToken();
        const userId = await getUserId();
        getUser(userId,token).then(userData => {
            const likedReviews = userData.liked_reviews;
            this.setState({likedReviews});
            const userReviews = userData.reviews;
            this.setState({userReviews});
        })
        .then(() => {
                const locationId = this.state.locationId;
                const likedReviews = this.state.likedReviews.filter(review =>
                    review.location.location_id === locationId
                );
                const reviewIds = likedReviews.map(review => {return review.review.review_id});
                this.setState({likedReviews:reviewIds});
        })
        .then(() => {
            const locationId = this.state.locationId;
            const userReviews = this.state.userReviews.filter(review =>
                review.location.location_id === locationId
            );
            const reviewIds = userReviews.map(review => {return review.review.review_id});
            this.setState({userReviews: reviewIds, isLoading:false, error:false});
        })
        .catch(error => {
            this.setState({error:true});
        })
        .finally(() => this.setState({isLoading:false}))
    }

    render(){
        return(
            <Content style={styles.content}>
                {this.state.isLoading ? (
                        <Spinner />
                    ) :
                    <>
                    <Image source={{uri:this.state.locationData.photo_path}} style={styles.image}/>
                    <Grid  style={styles.grid}>
                        <Row>
                            <Grid style={styles.grid}>
                                <Row>
                                    <H1>{this.state.locationData.location_name}</H1>
                                    <Right>
                                        <TouchableOpacity onPress={() => {this.favouriteLocation()}}>
                                            <Icon name={this.isFavourite()} style={styles.icon} />
                                        </TouchableOpacity>
                                    </Right>
                                </Row>
                                <Row>
                                    <Text>{this.state.locationData.location_town}</Text>
                                </Row>
                            </Grid>
                        </Row>   
                        <Grid style={styles.ratingGrid}>
                            <Row>
                                <H2>Ratings</H2>
                            </Row>
                            <Row> 
                                <Ratings ratings={this.state.ratings}/> 
                            </Row>
                        </Grid>
                        <Row style={styles.row}>
                            <H2>Reviews</H2>
                            <Right>
                                <Button small onPress={() => this.openWriteReview()} style={styles.button}><Text>Leave a review</Text></Button>
                            </Right>
                        </Row>
                        <Row style={styles.row}>
                            <Reviews reviews={this.state.reviews} locationId={this.state.locationId} likes={this.state.likedReviews} navigation={this.props.navigation} userReviews={this.state.userReviews} />
                        </Row>
                    </Grid>
                    </>
                }
            </Content>
        )
    };
}

const styles = StyleSheet.create({
    image: {
        height: 250, 
        width: null, 
        flex: 1
    },
    icon: {
        fontSize:30,
        color: '#4391ab'
    },
    content: {
        backgroundColor: 'white'
    },
    grid: {
        margin: 10,
    },
    ratingGrid:{
        margin: 10,
        borderBottomColor: '#0f84ab',
        borderTopColor: '#0f84ab',
        borderTopWidth: 2,
        borderBottomWidth:2,
        paddingTop: 20,
        paddingBottom: 20

    },
    row:{
        margin: 10,

    },
    button:{
        backgroundColor: '#4391ab'
    }



});

export default ShopScreen;