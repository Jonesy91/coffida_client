/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import { Text, Content, Row, Grid, Col, Right, H1, H2 } from 'native-base';
import { Image } from 'react-native';
import IonIcons from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ratings from '../components/Ratings';
import Reviews from '../components/Reviews';
import { getLocation, favourite, unFavourite } from '../Utilities/apiUtility';

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
            likes: this.props.route.params.likes
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
            <Content>
                <Image source={{uri:this.props.route.params.data.photo_path}} style={{height: 250, width: null, flex: 1}}/>
                <Grid>
                    <Row>
                        <Grid>
                            <Col>
                                <H1>{this.props.route.params.data.location_name}</H1>
                                <Text>{this.props.route.params.data.location_town}</Text>
                            </Col>
                            <Col>
                                <Right>
                                    <TouchableOpacity onPress={() => {this.favouriteLocation()}}>
                                        <IonIcons 
                                            name={this.isFavourite()}
                                            size={30}/>
                                    </TouchableOpacity>
                                </Right>
                            </Col>
                        </Grid>
                    </Row>   
                    <Row>
                        <H2>Ratings</H2>
                    </Row>
                    <Row>
                        <Ratings ratings={this.state.ratings}/> 
                    </Row>
                    <Row>
                    <H2>Reviews</H2>
                    <Right>
                        <TouchableOpacity onPress={() => this.openWriteReview()}>
                            <IonIcons name='md-add' size={30} color='black'/>     
                        </TouchableOpacity>
                    </Right>
                    </Row>
                    <Row>
                        <Reviews reviews={this.state.reviews} locationId={this.state.locationId} likes={this.state.likes} navigation={this.props.navigation}/>
                    </Row>
                </Grid>
            </Content>
        )
    };
}

export default ShopScreen;