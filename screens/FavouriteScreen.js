/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import { TouchableOpacity, FlatList } from 'react-native';
import { Container, Content, Spinner, H3, Grid, Row, Button, Text } from 'native-base';
import Geolocation from 'react-native-geolocation-service';
import ShopCard from '../components/ShopCard';
import HeaderMenu from '../components/HeaderMenu';
import { getShopsFiltered } from '../utilities/api/APIUtility';
import { getAuthToken } from '../utilities/asyncstorage/AsyncStorageUtil';
import styles from '../style/screens/FavouriteScreenStyle';
import { displayMessage } from '../utilities/error/errorHandler';
import { requestLocationPermission } from '../utilities/location/LocationUtility';

/* 
The favourite screen displayed the users favourite coffee shops.
*/
class FavouriteScreen extends Component{
    constructor(props){
        super(props)
        this.state={
            isLoading: true,
            favourites:[],
            error: false,
            currentFilter: null,
            currentSearch: null,
            page:0,
            results:3,
        }
    }

    /* 
    When the component mounts a focus listener is created to make api requests the when
    the screen is opened.
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
    handleSearch handles the search functionality triggered when the user
    presses the search button.
    */
    async handleSearch(searchData) {
        const { page, results } = this.state;
        this.setState({isLoading: true, currentSearch:searchData});
        const params = `q=${searchData}&search_in=favourite`
        const token = await getAuthToken();
        getShopsFiltered(token, params, results, 0)
            .then(getResponse => {
                this.setState({favourites: getResponse, isLoading:false, error: false});
            }) 
            .catch(error => {
                this.setState({error: true})    
                if(error === 401){
                    displayMessage('unauthorised request');
                } else {
                    displayMessage('Failed to retrieve locations');
                }
            })   
    }

    /* 
    handleFilter handles the filter functionality triggered when the user
    applies filters.
    */
    async handleFilter(inParams) {
        const { results } = this.state;
        this.setState({isLoading: true});
        const params = `${inParams}&search_in=favourite`
        const token = await getAuthToken();
        if(inParams === null){
            this.setState({currentFilter: null})
            this.getFavourites();
        } else{
            getShopsFiltered(token, params, results, )
            .then(getResponse => {
                this.setState({favourites: getResponse, isLoading:false, error: false});
            }) 
            .catch(error => {
                this.setState({error: true}) 
                if(error === 401){
                    displayMessage('unauthorised request');
                } else {
                    displayMessage('Failed to retrieve locations');
                } 
            })   
        }
    }

    /* 
    handlePagination requests the next set of shops when the user scrolls down the list and approachs the bottom of the screen.
    */
    async handlePagination() {
        const { page, results, favourites, currentSearch, currentFilter } = this.state;
        const token = await getAuthToken();
        if((currentSearch === null || currentSearch === '')&& (currentFilter === null || currentFilter === '')){
            getShopsFiltered(token,`search_in=favourite`, results, page)
                .then(getResponse => {
                    let newPage = (page + results);
                    this.setState({
                        favourites: [...favourites, ...getResponse], 
                        isLoading:false, error: false, page: newPage
                    });
                }) 
                .catch(error => {
                    this.setState({error: true})    
                    if(error === 401){
                        displayMessage('unauthorised request');
                    } else {
                        displayMessage('Failed to retrieve locations');
                    }
                }) 
        } 
    }

    /* 
    When an error occurs users are provided with a button to request data again.
    */
    handleTryAgain(){
        this.getFavourites();
    }

    /* 
    Gets the users current location 
    */
    async handleLocation() {
        this.setState({isLoading: true})
        try{
            if(await requestLocationPermission()){
                Geolocation.getCurrentPosition((position) => {
                const { longitude, latitude } = position.coords;
                const location = {latitude, longitude};
                this.setState({devLocation:location, isLoading:false})
                }, (error) => 
                    error
                , {
                    enableHighAccuracy: true,
                    timeout: 20000,
                    maximumAge: 1000
                });
            }
        } catch(error){
            this.setState({error})
        }
    }

    /* 
    Gets the data to render the home screen.
    */
    async getData(){
        this.setState({isLoading: true})
        const { route } = this.props;
        await this.handleLocation();
        /* 
        if there are route.params there a filters to be applied.
        */
        if(typeof route.params !== 'undefined'){
            this.handleFilter(route.params.filter);
            this.setState({currentFilter: route.params.currentFilter})
        } else {
            this.getFavourites();
        }     
    }

    /* 
    Requests the users favourite shops.
    */
    async getFavourites() {
        this.setState({isLoading: true});
        const { results } = this.state;
        const token = await getAuthToken();
        getShopsFiltered(token,`search_in=favourite`, results, 0)
            .then(getResponse => {
                let newPage = (0 + results);
                this.setState({favourites: getResponse, isLoading:false, error: false, page: newPage});
            })
            .catch(error => {
                this.setState({error: true})
                if(error === 401){
                    displayMessage('unauthorised request');
                } else {
                    displayMessage('Failed to retrieve locations');
                }
            })
    }

    /* 
    handles the navigation the selected coffee shop
    */
    openShop(locationId) {
        const { navigation } = this.props;
        const favourite = true;
        this.setState({currentSearch:'', currentFilter: null})
        navigation.navigate('shopScreen', {locationId, favourite});
    }

    /* 
    Returns the shop card to be rendered by the flat list.
    */
    renderLocation(favourite){
        const { devLocation } = this.state;
        return <TouchableOpacity onPress={() => this.openShop(favourite.location_id)}>
                    <ShopCard location={favourite} favourite devLocation={devLocation} />
                </TouchableOpacity>
    }

    render(){
        const { favourites = [], currentFilter, isLoading } = this.state;
        const { navigation, route} = this.props;
        return(
            <Container>
                <HeaderMenu 
                    searchCallback={this.handleSearch}  
                    navigation={navigation} 
                    currentFilter={currentFilter} 
                    route={route.name}
                />
                {/* if an error has occured a different screen is rendered */}
                {this.state.error ? (
                    <Content contentContainerStyle={styles.failureScreen}>
                        <Grid>
                            <Row style={styles.row}>
                                <H3>Failed to find coffee Shops</H3>
                            </Row>
                            <Row style={styles.row}>
                                <Button primary style={styles.button}><Text>Try Again</Text></Button>
                            </Row>
                        </Grid>
                    </Content>
                ):(
                    <>
                        {isLoading && (<Spinner />)}
                        {/* if the user has not facourites a message will be displayed */}
                        {!isLoading && favourites.length === 0 ? (
                            <H3  style={styles.text}>No favourite locations</H3>
                        ) : (
                            <FlatList 
                                data={favourites}
                                renderItem={({item}) => this.renderLocation(item)}
                                keyExtractor={item => item.location_id.toString()}
                                onEndReachedThreshold={0.1}
                                onEndReached={() => this.handlePagination()}
                                scrollEventThrottle={400}
                            />
                        )}
                    </>   
                )}
            </Container>
       );
    }
}

export default FavouriteScreen;