/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Container, Content, Spinner } from 'native-base';
import ShopCard from '../components/ShopCard';
import HeaderMenu from '../components/HeaderMenu';
import { getShops, getUser } from '../Utilities/APIUtility';

class HomeScreen extends Component{
    constructor(props){
        super(props);
        this.state={
            isLoading: true,
            locations:[],
            favLocations:[],
            likedReviews: [],
            userReviews:[],
        }
    }

    componentDidMount(){
        this.getUserInfo();
        this.findShops();
    }
    
    async getUserData() {
        const id = await AsyncStorage.getItem('@userId');
        const token = await AsyncStorage.getItem('@userKey');
        const data = {id,token};
        return data;
    }

    getUserInfo() {
        this.setState({isLoading:true});
        this.getUserData().then(
            userData => {
                const token = userData.token;
                const userId = userData.id;
                getUser(userId,token).then(userData => {
                    const favlocations = userData.favourite_locations.map(favourite => favourite.location_id);
                    this.setState({favLocations:favlocations});
                    const likedReviews = userData.liked_reviews;
                    this.setState({likedReviews});
                    const userReviews = userData.reviews;
                    this.setState({userReviews});
                })
                .then(() => {
                    const likes = this.state.locations.map(location => {
                        const locationId = location.location_id;
                        const likedReviews = this.state.likedReviews.map(review => {
                            let reviewId = null;
                            if(locationId === review.location.location_id){
                                reviewId = review.review.review_id;
                            }
                            return reviewId
                        })
                        return {location:locationId,reviewIds:likedReviews}
                    })
                    const likedReviews = likes.filter(like => {
                        if(!like.reviewIds.includes(null)){
                            return like;
                        }
                    })
                    this.setState({likedReviews, isLoading:false});
                })
                .then(() => {
                    const reviews = this.state.locations.map(location => {
                        const locationId = location.location_id;
                        const userReviews = this.state.userReviews.map(review => {
                            let reviewId = null;
                            if(locationId === review.location.location_id){
                                reviewId = review.review.review_id;
                            }
                            return reviewId
                        })
                        console.log(userReviews)
                        return {location:locationId,reviewIds:userReviews}
                    })
                    console.log(reviews)
                    const userReviews = reviews.filter(review => {
                        if(!review.reviewIds.includes(null)){
                            return review;
                        }
                    })
                    this.setState({userReviews, isLoading:false});
                })
            }
        )
    }

    async findShops() {
        this.setState({isLoading: true});
        const userData = await this.getUserData();
        getShops(userData.token).then(getResponse => {
            const data = getResponse.map((item) => {
                item.id=item.location_id.toString();
                return item;
        })
        this.setState({locations: data, isLoading:false});
        })       
    }

    openShop(data, favourite, likes, reviews) {
        this.props.navigation.navigate('shopScreen', {data, favourite, likes, reviews})
    }

    render(){
        return(
            <Container>
                <HeaderMenu />
                <Content>
                    {this.state.isLoading ? (
                        <Spinner />
                    ) : 
                    this.state.locations.map((location) => {
                    let favourite = false;
                    let likes = null;
                    let reviews = null;
                    if(this.state.favLocations.includes(location.location_id)){
                        favourite=true;
                    }
                    this.state.likedReviews.forEach(like => {
                        if(like.location === location.location_id){
                            likes = like;
                        }
                    })
                    this.state.userReviews.forEach(review => {
                        if(review.location === location.location_id){
                            reviews = review;
                        }
                    })
                    return <TouchableOpacity key={location.location_id} onPress={() => this.openShop(location, favourite, likes, reviews)}><ShopCard key={location.location_id} location={location} favourite={favourite}/></TouchableOpacity> 
                    }
                    )}  
                </Content> 
            </Container> 
        );
    }
}

export default HomeScreen;