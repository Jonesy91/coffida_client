/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { Container, Content, Spinner, H3, Grid, Row, Button, Text } from 'native-base';
import ShopCard from '../components/ShopCard';
import HeaderMenu from '../components/HeaderMenu';
import { getFavourites, getShopsFiltered } from '../utilities/api/APIUtility';
import { getAuthToken } from '../utilities/asyncstorage/AsyncStorageUtil';

class FavouriteScreen extends Component{
    constructor(props){
        super(props)
        this.state={
            isLoading: true,
            favourites:[],
            error: false,
            currentFilter: null,
        }
    }

    componentDidMount() {
        const { navigation, route } = this.props;
        this.focusListener = navigation.addListener('focus', () => {
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

    async handleFilter(inParams) {
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

    openShop(locationId) {
        const { navigation } = this.props;
        const favourite = true;
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
                                <Button style={styles.button}><Text>Try Again</Text></Button>
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
                            />
                        )}
                    </>   
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