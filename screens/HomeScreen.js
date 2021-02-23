/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Container, Content, Spinner, Text, Button, Row, Grid, H3, View } from 'native-base';
import ShopCard from '../components/ShopCard';
import HeaderMenu from '../components/HeaderMenu';
import { getShops, getUser, getShopsFiltered } from '../utilities/api/APIUtility';
import { getAuthToken, getUserId } from '../utilities/asyncstorage/AsyncStorageUtil';
import { FlatList } from 'react-native-gesture-handler';

class HomeScreen extends Component{
    constructor(props){
        super(props);
        this.state={
            isLoading: true,
            locations:[],
            favLocations:[],
            error: false,
            currentFilter: null
        }
    }

    componentDidMount() {
        const { navigation, route } = this.props;
        this.focusListener = navigation.addListener('focus', e => {
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
        this.setState({isLoading: true});
        const params = `q=${searchData}`
        const token = await getAuthToken();
        getShopsFiltered(token, params)
            .then(getResponse => {
                this.setState({locations: getResponse, isLoading:false, error: false});
            }) 
            .catch(error => {
                this.setState({error: true})    
            })   
    }

    async handleFilter(params) {
        this.setState({isLoading: true});
        const token = await getAuthToken();
        const getResponse = await getShopsFiltered(token, params);
        this.setState({locations: getResponse, isLoading:false, error: false});
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
            })
    }

    async findShops() {
        this.setState({isLoading: true});
        const token = await getAuthToken();
        getShops(token)
            .then(getResponse => {
                this.setState({locations: getResponse, isLoading:false, error: false});
            }) 
            .catch(error => {
                this.setState({error: true})    
            })     
    }

    openShop(locationId, favourite) {
        const { navigation } = this.props;
        navigation.navigate('shopScreen', {locationId, favourite})
    }

    renderLocation(location){
        const { favLocations } = this.state;
        let favourite = false;
        if(favLocations.includes(location.location_id)) {
                favourite=true;
        }
        return <TouchableOpacity 
                    onPress={() => this.openShop(location.location_id,favourite)}
                >
                    <ShopCard 
                        location={location} 
                        favourite={favourite}
                    />
                </TouchableOpacity> 
    }

    render(){
        const { locations = [], currentFilter, isLoading, error } = this.state;
        const { navigation, route } = this.props;
        return(
            <Container>
                <HeaderMenu 
                    searchCallback={this.handleSearch} 
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
                            <Button style={styles.button}><Text>Try Again</Text></Button>
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
                            />
                        )}
                    </>      
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
    },
    resultView:{
        marginTop:50,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default HomeScreen;