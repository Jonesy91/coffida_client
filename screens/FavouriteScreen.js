/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Container, Content, Spinner, H3, Grid, Row, Button, Text } from 'native-base';
import ShopCard from '../components/ShopCard';
import HeaderMenu from '../components/HeaderMenu';
import { getFavourites, getUser, getShopsFiltered } from '../utilities/api/APIUtility';
import { getAuthToken, getUserId } from '../utilities/asyncstorage/AsyncStorageUtil';

class FavouriteScreen extends Component{
    constructor(props){
        super(props)
        this.state={
            isLoading: true,
            favourites:[],
            likedReviews: [],
            userReviews:[],
            error: false,
            currentFilter: null,
        }
    }

    componentDidMount() {
        this.focusListener = this.props.navigation.addListener('focus', () => {
            this.getUserInfo();
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

    async getUserInfo() {
        this.setState({isLoading: true});
        const token = await getAuthToken();
        const userId = await getUserId();
        getUser(userId,token)
            .then(userData => {
                const likedReviews = userData.liked_reviews;
                this.setState({likedReviews});
                const userReviews = userData.reviews;
                this.setState({userReviews});
            })
            .catch(error => {
                this.setState({error:true});
            })
    }
 
    async getFavourites() {
        this.setState({isLoading: true});
        const token = await getAuthToken();
        getFavourites(token)
            .then(getResponse => {
                this.setState({favourites: getResponse, isLoading:false, error: false});
            })
            .catch(error => {
                this.setState({error: true})
            })
    }

    handleSearch = async (searchData) => {
        this.setState({isLoading: true});
        const params = `q=${searchData}&search_in=favourite`
        const token = await getAuthToken();
        getShopsFiltered(token, params)
            .then(getResponse => {
                this.setState({favourites: getResponse, isLoading:false, error: false});
            }) 
            .catch(error => {
                this.setState({error: true})    
            })   
    }

    handleFilter = async (inParams) => {
        this.setState({isLoading: true});
        const params = `${inParams}&search_in=favourite`
        const token = await getAuthToken();
        getShopsFiltered(token, params)
            .then(getResponse => {
                this.setState({favourites: getResponse, isLoading:false, error: false});
            }) 
            .catch(error => {
                this.setState({error: true})    
            })   
    }

    openShop(locationId) {
        const favourite = true;
        this.props.navigation.navigate('shopScreen', {locationId, favourite});
    }

    render(){
        const { favourites = [] } = this.state;
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
                        {!this.state.isLoading && favourites.length === 0 ? (
                            <H3  style={styles.text}>No favourite locations</H3>
                        ) : (
                            this.state.favourites.map((favourite) => {
                                let likes = null;
                                this.state.likedReviews.forEach(like => {
                                    if(like.location === favourite.location_id){
                                        likes = like;
                                    }
                                })
                                return <TouchableOpacity key={favourite.location_id} onPress={() => this.openShop(favourite.location_id)}><ShopCard key={favourite.location_id} location={favourite} favourite={true}/></TouchableOpacity>
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