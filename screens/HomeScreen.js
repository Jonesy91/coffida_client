/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import { TouchableOpacity, FlatList } from 'react-native';
import { Content, Spinner, Text, Button, Row, Grid, H3, View } from 'native-base';
import Geolocation from 'react-native-geolocation-service';
import ShopCard from '../components/ShopCard';
import HeaderMenu from '../components/HeaderMenu';
import { getShops, getUser, getShopsFiltered } from '../utilities/api/APIUtility';
import { getAuthToken, getUserId } from '../utilities/asyncstorage/AsyncStorageUtil';
import styles from '../style/screens/HomeScreenStyle';
import { displayMessage } from '../utilities/error/errorHandler';
import { requestLocationPermission } from '../utilities/location/LocationUtility';

/* 
The home screens is displayed to users when they have logged in and will 
display as list of coffee shops.
*/
class HomeScreen extends Component{
    constructor(props){
        super(props);
        this.state={
            isLoading: true,
            locations:[],
            favLocations:[],
            error: false,
            currentFilter: null,
            currentSearch: null,
            page:0,
            results:3,
            devLocation: null,
        }
    }

    /* 
    When the component mounts the users data and shop data is requested to 
    populate the screen.
    */
    componentDidMount() {
        const { navigation } = this.props;
        this.focusListener = navigation.addListener('focus', e => {
            this.getData();
              
        });
    }

    componentWillUnmount() {
        this.focusListener();
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
    if the users has provided a search criteria this function will search using the 
    criteria if the search criteria is empty all shops will be returned.
    */
    async handleSearch(searchData) {
        const { results } = this.state;
        this.setState({isLoading: true, currentSearch:searchData});
        const params = `q=${searchData}`
        const token = await getAuthToken();
        if(searchData === ''){
            this.setState({currentSearch: null})
            this.findShops();
        } else {
            getShopsFiltered(token, params, results, 0)
            .then(getResponse => {
                this.setState({locations: getResponse, isLoading:false, error: false});
            }) 
            .catch(error => {
                this.setState({error: true})
                if(error === 401) {
                    displayMessage('You dont have access to view locations');
                } else {
                    displayMessage('Failed to get locations');
                }
            }) 
        }

        /* 
        Requests a list of shops using the filter provided by the user.
        */
        getShopsFiltered(token, params, results, 0)
            .then(getResponse => {
                this.setState({locations: getResponse, isLoading:false, error: false});
            }) 
            .catch(error => {
                this.setState({error: true})
                if(error === 401) {
                    displayMessage('You dont have access to view locations');
                } else {
                    displayMessage('Failed to get locations');
                }
            })   
    }

    /* 
    If the user has applied filters this function is called check the filters
    and request the data.
    */
    async handleFilter(params) {
        const { results } = this.state;
        this.setState({isLoading: true});
        const token = await getAuthToken();
        if(params === null){
            this.setState({currentFilter: null})
            this.findShops();
        } else {
            try{
                const getResponse = await getShopsFiltered(token, params, results, 0);
                this.setState({locations: getResponse, isLoading:false, error: false});
            } catch(error) {
                this.setState({error: true})
                if(error === 401) {
                    displayMessage('You dont have access to view locations');
                } else {
                    displayMessage('Failed to get locations');
                }
            }
        }        
    }

    /* 
    If the user faces an error the try again button calls this function
    to re-request the the user and shop data.
    */
    handleTryAgain(){
        this.getUserInfo();
        this.findShops();
    }

    /* 
    This function handles the pagination and requests the next set of shops
    when the user approaches the bottom of the screen.
    */
    async handlePagination() {
        const { page, results, locations, currentSearch, currentFilter } = this.state;
        const token = await getAuthToken();
        if((currentSearch === null || currentSearch === '')&& (currentFilter === null || currentFilter === '')){
            getShops(token, page)
            .then(getResponse => {
                let newPage = (page + results);
                this.setState({
                    locations: [...locations, ...getResponse], 
                    isLoading:false, error: false, page: newPage
                });
            }) 
            .catch(error => {
                this.setState({error: true})  
                if(error === 401) {
                    displayMessage('You dont have access to view locations');
                } else {
                    displayMessage('Failed to get locations');
                }
            })  
        }
    }

    /* 
    Gets the data to render the home screen.
    */
    async getData(){
        this.setState({isLoading: true})
        const { route } = this.props;
        await this.handleLocation();
        await this.getUserInfo();
        /* 
        if there are route.params there a filters to be applied.
        */
        if(typeof route.params !== 'undefined'){
            this.handleFilter(route.params.filter);
            this.setState({currentFilter: route.params.currentFilter})
        } else {
            this.findShops();
        }     
    }

    /* 
    This function requests the users information
    */
    async getUserInfo() {
        this.setState({isLoading:true});
        const token = await getAuthToken();
        const userId = await getUserId();
        getUser(userId,token)
            .then(userData => {
                const favlocations = userData.favourite_locations.map(favourite => favourite.location_id);
                this.setState({favLocations:favlocations});
            })
            .catch(error => {
                this.setState({error:true});
                if(error === 401) {
                    displayMessage('You dont have access to get user information');
                } else if(error === 404) {
                    displayMessage('Cannot find the request user');
                } else {
                    displayMessage('Failed to get user informattion');
                }
            })
    }

    /* 
    This function requests the shop data
    */
    async findShops() {
        this.setState({isLoading: true});
        const { results } = this.state;
        const token = await getAuthToken();
        getShops(token, 0)
            .then(getResponse => {
                let newPage = (0 + results);
                this.setState({locations:getResponse, isLoading:false, error: false, page: newPage});
            }) 
            .catch(error => {
                this.setState({error: true})    
                if(error === 401) {
                    displayMessage('You dont have access to view locations');
                } else {
                    displayMessage('Failed to get locations');
                }
            })     
        }

    /* 
    This function will navigate the users to the selected shop
    */
    openShop(locationId, favourite) {
        const { navigation } = this.props;
        this.setState({currentSearch:'', currentFilter: null})
        navigation.navigate('shopScreen', {locationId, favourite})
    }

    /* 
    Returns the card which will display the shop data for each shop.
    */
    renderLocation(location){
        const { favLocations, devLocation } = this.state;

        let favourite = false;
        if(favLocations.includes(location.location_id)) {
                favourite=true;
        }
        return <TouchableOpacity onPress={() => this.openShop(location.location_id,favourite)}>
                    <ShopCard location={location} favourite={favourite} devLocation={devLocation} />
                </TouchableOpacity> 
    }

    render(){
        const { locations = [], currentFilter, isLoading, error } = this.state;
        const { navigation, route } = this.props;
        return(
            <>
                <HeaderMenu 
                    searchCallback={(data) => this.handleSearch(data)} 
                    navigation={navigation} 
                    currentFilter={currentFilter}
                    route={route.name}
                />
                {error ? (
                    <Content contentContainerStyle={styles.failureScreen}>
                    <Grid>
                        <Row style={styles.row}>
                            <H3>Failed to find coffee Shops</H3>
                        </Row>
                        <Row style={styles.row}>
                            <Button style={styles.button} onPress={() => this.handleTryAgain()}><Text>Try Again</Text></Button>
                        </Row>
                    </Grid>
                    </Content>
                ) : (
                    <>
                        {isLoading && (<Spinner />)}
                        {/* If no results are return a message will be rendered. */}
                        {!isLoading && !locations.length ? (
                            <View style={styles.resultView}>
                                <H3>No matching results</H3>
                            </View>
                         ) : (
                            <FlatList 
                                data={locations}
                                renderItem={({item}) => this.renderLocation(item)}
                                keyExtractor={item => item.location_id.toString()}
                                onEndReachedThreshold={0.5}
                                onEndReached={() => this.handlePagination()}
                                scrollEventThrottle={400}
                            />
                        )}
                    </>      
                )} 
            </>
        );
    }
}

export default HomeScreen;