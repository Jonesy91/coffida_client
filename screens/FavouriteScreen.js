/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import { TouchableOpacity, FlatList } from 'react-native';
import { Container, Content, Spinner, H3, Grid, Row, Button, Text } from 'native-base';
import ShopCard from '../components/ShopCard';
import HeaderMenu from '../components/HeaderMenu';
import { getShopsFiltered } from '../utilities/api/APIUtility';
import { getAuthToken } from '../utilities/asyncstorage/AsyncStorageUtil';
import styles from '../style/screens/FavouriteScreenStyle';

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

    componentDidMount() {
        const { navigation } = this.props;
        this.focusListener = navigation.addListener('focus', () => {
            const { route } = this.props;
            if(typeof route.params !== 'undefined'){
                this.handleFilter(route.params.filter);
                this.setState({currentFilter: route.params.currentFilter})
            } else {
                this.getFavourites();
            }
           
        });
    }

    componentWillUnmount() {
        this.focusListener();
    }

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
            })   
    }

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
            })   
        }
    }

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
                }) 
        } 
    }

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
            })
    }

    openShop(locationId) {
        const { navigation } = this.props;
        const favourite = true;
        this.setState({currentSearch:'', currentFilter: null})
        navigation.navigate('shopScreen', {locationId, favourite});
    }

    renderLocation(favourite){
        return <TouchableOpacity onPress={() => this.openShop(favourite.location_id)}>
                    <ShopCard location={favourite} favourite />
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