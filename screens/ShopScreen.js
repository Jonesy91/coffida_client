/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import { Text, Content, Row, Grid, Right, H1, H2, Icon, Button } from 'native-base';
import { Image, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ratings from '../components/Ratings';
import Reviews from '../components/Reviews';
import { getLocation, favourite, unFavourite } from '../Utilities/APIUtility';

class ShopScreen extends Component{
    constructor(props){
        super(props)
        this.state={
            ratings:{
                overall:this.props.route.params.data.avg_overall_rating, 
                price:this.props.route.params.data.avg_price_rating, 
                quality:this.props.route.params.data.avg_quality_rating,
                clenliness:this.props.route.params.data.avg_clenliness_rating
            },
            locationId:this.props.route.params.data.location_id,
            reviews: this.props.route.params.data.location_reviews,
            isFavourite: this.props.route.params.favourite,
            likes: this.props.route.params.likes,
            userReviews: this.props.route.params.reviews
        }
    }

    componentDidMount() {
        this.focusListener = this.props.navigation.addListener('focus', () => {
            this.getShopData();
        });
    }

    componentWillUnmount() {
        this.focusListener;
    }

    openWriteReview() {
        this.props.navigation.navigate('writeReview', {locationId:this.state.locationId});
    }

    isFavourite() {
        let iconName;
        if(this.state.isFavourite === true){
            iconName='md-bookmark'
        }else{
            iconName='md-bookmark-outline'
        }
        return iconName
    }

    favouriteLocation() {
        this.getAuthKey().then(token => {
            if(this.state.isFavourite === false){
                favourite(this.state.locationId, token)
                    .then(this.setState({isFavourite:true}));
            } else{
                unFavourite(this.state.locationId, token)
                    .then(this.setState({isFavourite:false}));
            }   
        })
    }

    getShopData() {
        this.getAuthKey().then(
            token => {
                getLocation(this.state.locationId, token).then(data => {
                    this.setState({
                        reviews: data.location_reviews,
                        ratings:{
                            overall:data.avg_overall_rating, 
                            price:data.avg_price_rating, 
                            quality:data.avg_quality_rating,
                            clenliness:data.avg_clenliness_rating
                        }
                    });
                })
            }
        )
    }

    async getAuthKey() {
        try{
            const token = await AsyncStorage.getItem('@userKey');
            if(token !== null){
                return token;
            }
            else{
                throw error('null object');
            }
        } catch (e) {
            console.log(e);
        }
    }   

    render(){
        return(
            <Content style={styles.content}>
                <Image source={{uri:this.props.route.params.data.photo_path}} style={styles.image}/>
                <Grid  style={styles.grid}>
                    <Row>
                        <Grid style={styles.grid}>
                            <Row>
                                <H1>{this.props.route.params.data.location_name}</H1>
                                <Right>
                                    <TouchableOpacity onPress={() => {this.favouriteLocation()}}>
                                        <Icon name={this.isFavourite()} style={styles.icon} />
                                    </TouchableOpacity>
                                </Right>
                            </Row>
                            <Row>
                                <Text>{this.props.route.params.data.location_town}</Text>
                            </Row>
                        </Grid>
                    </Row>   
                    <Grid style={styles.ratingGrid}>
                        <Row>
                            <H2>Ratings</H2>
                        </Row>
                        <Row> 
                            <Ratings ratings={this.state.ratings}/> 
                        </Row>
                    </Grid>
                    <Row style={styles.row}>
                        <H2>Reviews</H2>
                        <Right>
                            <Button small onPress={() => this.openWriteReview()} style={styles.button}><Text>Leave a review</Text></Button>
                        </Right>
                    </Row>
                    <Row style={styles.row}>
                        <Reviews reviews={this.state.reviews} locationId={this.state.locationId} likes={this.state.likes} navigation={this.props.navigation} userReviews={this.state.userReviews} nav={this.props.navigation}/>
                    </Row>
                </Grid>
            </Content>
        )
    };
}

const styles = StyleSheet.create({
    image: {
        height: 250, 
        width: null, 
        flex: 1
    },
    icon: {
        fontSize:30,
        color: '#4391ab'
    },
    content: {
        backgroundColor: 'white'
    },
    grid: {
        margin: 10,
    },
    ratingGrid:{
        margin: 10,
        borderBottomColor: '#0f84ab',
        borderTopColor: '#0f84ab',
        borderTopWidth: 2,
        borderBottomWidth:2,
        paddingTop: 20,
        paddingBottom: 20

    },
    row:{
        margin: 10,

    },
    button:{
        backgroundColor: '#4391ab'
    }



});

export default ShopScreen;