/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Container, Content, Spinner, Text, Button, Row, Grid, H3 } from 'native-base';
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
            error: false
        }
    }

    componentDidMount() {
        this.focusListener = this.props.navigation.addListener('focus', () => {
            this.getUserInfo();
            this.findShops();
        });
    }

    componentWillUnmount() {
        this.focusListener;
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
                        return {location:locationId,reviewIds:userReviews}
                    })
                    const userReviews = reviews.filter(review => {
                        if(!review.reviewIds.includes(null)){
                            return review;
                        }
                    })
                    this.setState({userReviews, isLoading:false, error:false});
                })
                .catch(error => {
                    console.log(error)
                    this.setState({error:true});
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
        this.setState({locations: data, isLoading:false, error: false});
        }) 
        .catch(error => {
            console.log(error)
            this.setState({error: true})    
        })     
    }

    openShop(data, favourite, likes, reviews) {
        this.props.navigation.navigate('shopScreen', {data, favourite, likes, reviews})
    }

    render(){
        return(
            <Container>
                <HeaderMenu />
                {this.state.error ? (
                    <Content contentContainerStyle={styles.failureScreen}>
                    <Grid>
                        <Row style={styles.row}>
                            <H3>Failed to find coffee Shops</H3>
                        </Row>
                        <Row style={styles.row}>
                            <Button style={styles.button}><Text>Try Again</Text></Button>
                        </Row>
                    </Grid>
                    </Content>
                ) : (
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
                )} 
            </Container> 
        );
    }
}

const styles = StyleSheet.create({
    failureScreen:{
        marginTop:50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    row:{
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10
    },
    button:{
        backgroundColor: '#4391ab'
    }
});

export default HomeScreen;