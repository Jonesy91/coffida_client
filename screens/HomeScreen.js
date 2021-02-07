/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Container, Content } from 'native-base';
import ShopCard from '../components/ShopCard';

class HomeScreen extends Component{
    constructor(props){
        super(props);
        this.state={
            isLoading: true,
            locations:[],
            authKey: '',
            favLocations:[],
            likedReviews: []
        }
    }

    componentDidMount(){
        this.getUser();
        this.findShops();
    }
    
    async getUserData() {
        const id = await AsyncStorage.getItem('@userId');
        const token = await AsyncStorage.getItem('@userKey');
        const data = {id,token};
        return data;
    }

    async getAuthKey() {
        try{
            const token = await AsyncStorage.getItem('@userKey');
            if(token !== null){
                this.setState({authKey: token})
            }
            else{
                throw error('null object');
            }
        } catch (e) {
            console.log(e);
        }
    }

    getUser() {
        this.getUserData().then(
            userData => {
                const {token} = userData;
                const userId = userData.id;
                fetch(`http://10.0.2.2:3333/api/1.0.0/user/${userId}`,{
                headers:{
                        'X-Authorization': token
                    }
                })
                .then(response => response.json())
                .then(data => {
                    const favlocations = data.favourite_locations.map(favourite => favourite.location_id);
                    this.setState({favLocations:favlocations});
                    const likedReviews = data.liked_reviews;
                    this.setState({likedReviews});
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
                    this.setState({likedReviews})
                })
            }
        )
        
    }

    findShops() {
        this.getAuthKey().then(
            response => {
                const token = this.state.authKey;
                fetch('http://10.0.2.2:3333/api/1.0.0/find',{
                headers:{
                        'X-Authorization': token
                    }
                })
                .then(response => response.json())
                .then(data => {
                    const locationResp = data.map((item) => {
                        item.id=item.location_id.toString();
                        return item;
                    })
                    this.setState({
                        isLoading: false,    
                        locations: locationResp
                    });
                });
            }
        )
    }

    openShop(data, favourite, likes) {
        this.props.navigation.navigate('shopScreen', {data, favourite, likes})
    }

    render(){
        const likedReviews = this.state.likedReviews;
        return(
                <Container>
                <Content>
                {this.state.locations.map((location) => {
                    let favourite = false;
                    let likes = null;
                    if(this.state.favLocations.includes(location.location_id)){
                        favourite=true;
                    }
                    this.state.likedReviews.forEach(like => {
                        if(like.location === location.location_id){
                            likes = like;
                        }
                    })
                     return <TouchableOpacity key={location.location_id} onPress={() => this.openShop(location, favourite, likes)}><ShopCard key={location.location_id} location={location} favourite={favourite}/></TouchableOpacity> 
                    }
                )}  
            </Content> 
            </Container> 
        );
    }
}

export default HomeScreen;