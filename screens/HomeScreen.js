/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import { TouchableOpacity, FlatList } from 'react-native';
import { Content, Spinner, Text, Button, Row, Grid, H3, View } from 'native-base';
import ShopCard from '../components/ShopCard';
import HeaderMenu from '../components/HeaderMenu';
import { getShops, getUser, getShopsFiltered } from '../utilities/api/APIUtility';
import { getAuthToken, getUserId } from '../utilities/asyncstorage/AsyncStorageUtil';
import styles from '../style/screens/HomeScreenStyle';
import { displayMessage } from '../utilities/error/errorHandler';

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
        }
    }

    componentDidMount() {
        const { navigation } = this.props;
        this.focusListener = navigation.addListener('focus', e => {
            console.log('trying')
            const { route } = this.props;
            this.getUserInfo();
            if(typeof route.params !== 'undefined'){
                this.handleFilter(route.params.filter);
                this.setState({currentFilter: route.params.currentFilter})
            } else {
                this.findShops();
            }        
        });
    }

    componentWillUnmount() {
        this.focusListener();
    }

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

    handleTryAgain(){
        this.getUserInfo();
        this.findShops();
    }

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

    openShop(locationId, favourite) {
        const { navigation } = this.props;
        this.setState({currentSearch:'', currentFilter: null})
        navigation.navigate('shopScreen', {locationId, favourite})
    }

    renderLocation(location){
        const { favLocations } = this.state;
        let favourite = false;
        if(favLocations.includes(location.location_id)) {
                favourite=true;
        }
        return <TouchableOpacity onPress={() => this.openShop(location.location_id,favourite)}>
                    <ShopCard location={location} favourite={favourite} />
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