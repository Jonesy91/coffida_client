import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Container, Content, Spinner } from 'native-base';
import ShopCard from '../components/ShopCard';
import HeaderMenu from '../components/HeaderMenu';
import { getFavourites, getUser } from '../Utilities/APIUtility';


class FavouriteScreen extends Component{
    constructor(props){
        super(props)
        this.state={
            isLoading: true,
            favourites:[],
            likedReviews: []
        }
    }

    componentDidMount(){
        this.getUser();
        this.getFavourites();
    }
 
    getFavourites() {
        this.setState({isLoading: true});
        this.getUserData().then(userData => {
            getFavourites(userData.token).then(data => {
                console.log(data);
                const favourites = data.map((favourite) =>  {
                    favourite.id=favourite.location_id.toString();
                    return favourite
                })
                this.setState({
                    isLoading:false,
                    favourites:favourites
                })
            })
        })
    }


    async getUserData() {
        const id = await AsyncStorage.getItem('@userId');
        const token = await AsyncStorage.getItem('@userKey');
        const data = {id:id,token:token};
        return data;
    }

    getUser() {
        this.setState({isLoading: true});
        this.getUserData().then(
            userData => {
                const token = userData.token;
                const userId = userData.id;
                getUser(userId,token).then(data => {
                    const likedReviews = data.liked_reviews;
                    this.setState({likedReviews});
                })
                .then(() => {
                    const likes = this.state.favourites.map(location => {
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
                    this.setState({likedReviews, isLoading:false})
                })
            }
        )
    }

    openShop(data, likes) {
        console.log(likes);
        const favourite = true;
        this.props.navigation.navigate('shopScreen', {data:data, favourite:favourite, likes:likes})
    }

    render(){
        return(
            <Container>
                <HeaderMenu />
                <Content>
                {this.state.isLoading ? (
                    <Spinner />
                ) : 
                    this.state.favourites.map((favourite) => {
                        let likes = null;
                        this.state.likedReviews.forEach(like => {
                            if(like.location === favourite.location_id){
                                likes = like;
                            }
                        })
                    return <TouchableOpacity key={favourite.location_id} onPress={() => this.openShop(favourite, likes)}><ShopCard location={favourite} favourite={true}/></TouchableOpacity>
                    }
                )
                }
                </Content>   
            </Container>
       );
    }
}

export default FavouriteScreen;


{/* <FlatList
                        data={this.state.favourites}
                        renderItem={({item}) => <TouchableOpacity onPress={() => this.openShop(item)}><ShopCard location={item} favourite={true}/></TouchableOpacity>}
                    /> */}