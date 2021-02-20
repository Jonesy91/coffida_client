/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Container, Content, Spinner, H3, Grid, Row, Button, Text } from 'native-base';
import ShopCard from '../components/ShopCard';
import HeaderMenu from '../components/HeaderMenu';
import { getFavourites, getUser, getShopsFiltered } from '../Utilities/APIUtility';


class FavouriteScreen extends Component{
    constructor(props){
        super(props)
        this.state={
            isLoading: true,
            favourites:[],
            likedReviews: [],
            error: false,
            currentFilter: null,
        }
    }

    componentDidMount() {
        this.focusListener = this.props.navigation.addListener('focus', () => {
            this.getUser();
            const params = this.props.route.params;
            if(typeof params !== 'undefined'){
                this.handleFilter(params.filter);
                this.setState({currentFilter: params.currentFilter})
            } else {
                this.getFavourites();
            }
           
        });
    }

    componentWillUnmount() {
        this.focusListener;
    }
 
    getFavourites() {
        this.setState({isLoading: true});
        this.getUserData().then(userData => {
            getFavourites(userData.token)
            .then(data => {
                const favourites = data.map((favourite) =>  {
                    favourite.id=favourite.location_id.toString();
                    return favourite
                })
                this.setState({
                    isLoading:false,
                    favourites:favourites,
                })
            })
            .catch(error => {
                this.setState({error:true});
            })
        })
    }

    handleSearch = async (searchData) => {
        this.setState({isLoading: true});
        const params = `q=${searchData}&search_in=favourite`
        const userData = await this.getUserData();
        getShopsFiltered(userData.token, params).then(getResponse => {
        this.setState({favourites: getResponse, isLoading:false, error: false});
        }) 
        .catch(error => {
            console.log(error)
            this.setState({error: true})    
        })   
    }

    handleFilter = async (inParams) => {
        this.setState({isLoading: true});
        const params = `${inParams}&search_in=favourite`
        const userData = await this.getUserData();
        getShopsFiltered(userData.token, params).then(getResponse => {
        this.setState({favourites: getResponse, isLoading:false, error: false});
        }) 
        .catch(error => {
            console.log(error)
            this.setState({error: true})    
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
        })
        .catch(error => {
            this.setState({error:true});
        })
    }

    openShop(data, likes) {
        console.log(likes);
        const favourite = true;
        this.props.navigation.navigate('shopScreen', {data:data, favourite:favourite, likes:likes})
    }

    render(){
        return(
            <Container>
                <HeaderMenu 
                    searchCallback={this.handleSearch}  
                    navigation={this.props.navigation} 
                    currentFilter={this.state.currentFilter} 
                    route={this.props.route.name}
                />
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
                ):(
                    <Content>
                        {this.state.isLoading && (<Spinner />)}
                        {!this.state.isLoading && this.state.favourites.length === 0 ? (
                        <H3  style={styles.text}>No favourite locations</H3>
                        ) : (
                        this.state.favourites.map((favourite) => {
                            let likes = null;
                            this.state.likedReviews.forEach(like => {
                                if(like.location === favourite.location_id){
                                    likes = like;
                                }
                            })
                            return <TouchableOpacity key={favourite.location_id} onPress={() => this.openShop(favourite, likes)}><ShopCard location={favourite} favourite/></TouchableOpacity>
                            }
                        )
                    )}
                    </Content>   
                )}
            </Container>
       );
    }
}

const styles = StyleSheet.create({
    text: {
        margin: 50,
        textAlign: 'center',
    },
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

export default FavouriteScreen;