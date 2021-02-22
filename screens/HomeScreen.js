/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Container, Content, Spinner, Text, Button, Row, Grid, H3, View } from 'native-base';
import ShopCard from '../components/ShopCard';
import HeaderMenu from '../components/HeaderMenu';
import { getShops, getUser, getShopsFiltered } from '../utilities/api/APIUtility';
import { getAuthToken, getUserId } from '../utilities/asyncstorage/AsyncStorageUtil';

class HomeScreen extends Component{
    constructor(props){
        super(props);
        this.state={
            isLoading: true,
            locations:[],
            favLocations:[],
            likedReviews: [],
            userReviews:[],
            error: false,
            currentFilter: null
        }
    }

    componentDidMount() {
        this.focusListener = this.props.navigation.addListener('focus', e => {
            this.getUserInfo();
            const params = this.props.route.params;
            if(typeof params !== 'undefined'){
                this.handleFilter(params.filter);
                this.setState({currentFilter: params.currentFilter})
            } else {
                this.findShops();
            }
        });
    }

    componentWillUnmount() {
        this.focusListener;
    }

    async getUserInfo() {
        this.setState({isLoading:true});
        const token = await getAuthToken();
        const userId = await getUserId();
        getUser(userId,token)
            .then(userData => {
                const favlocations = userData.favourite_locations.map(favourite => favourite.location_id);
                this.setState({favLocations:favlocations});
                const likedReviews = userData.liked_reviews;
                this.setState({likedReviews});
                const userReviews = userData.reviews;
                this.setState({userReviews});
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

    handleSearch = async (searchData) => {
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

    handleFilter = async (params) => {
        this.setState({isLoading: true});
        const token = await getAuthToken();
        const getResponse = await getShopsFiltered(token, params);
        this.setState({locations: getResponse, isLoading:false, error: false});
    }

    openShop(locationId, favourite) {
        this.props.navigation.navigate('shopScreen', {locationId, favourite})
    }

    render(){
        const { locations = [] } = this.state;
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
                ) : (
                    <Content>
                        {this.state.isLoading && (<Spinner />)}
                        {!this.state.isLoading && !locations.length ? (
                            <View style={styles.resultView}>
                                <H3>No matching results</H3>
                            </View>
                         ) : (
                            locations.map((location) => {
                                let favourite = false;
                                if(this.state.favLocations.includes(location.location_id)){
                                    favourite=true;
                                }
                            return <TouchableOpacity key={location.location_id} onPress={() => this.openShop(location.location_id,favourite)}><ShopCard key={location.location_id} location={location} favourite={favourite}/></TouchableOpacity> 
                            })
                        )}
                    </Content>      
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