import React, { Component } from 'react';
import { Text, Content, Left, Row, Grid, Col, Right, H1, H2 } from 'native-base';
import { Image, View } from 'react-native';
import IonIcons from 'react-native-vector-icons/Ionicons';
import StarRating from 'react-native-star-rating';
import Ratings from '../components/Ratings';
import ReviewCard from '../components/ReviewCard';
import Reviews from '../components/Reviews';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

class ShopScreen extends Component{
    constructor(props){
        super(props)
        this.state={
            ratings:[],
            locationId:this.props.route.params.data.location_id,
            isFavourite: false
        }
    }

    componentDidMount(){
        this.setState({ratings:{
            overall:this.props.route.params.data.avg_overall_rating, 
            price:this.props.route.params.data.avg_price_rating, 
            quality:this.props.route.params.data.avg_quality_rating,
            clenliness:this.props.route.params.data.avg_clenliness_rating}
        });
    }

    openWriteReview = () => {
        this.props.navigation.navigate('writeReview', {locationId:this.state.locationId});
    }

    isFavourite = () => {
        let iconName;
        if(this.state.isFavourite === true){
            iconName='md-bookmark'
        }else{
            iconName='md-bookmark-outline'
        }
        return iconName
    }

    favouriteLocation = () => {
        this.getAuthKey().then(authKey => {
            if(this.state.isFavourite === false){
                fetch('http://10.0.2.2:3333/api/1.0.0/location/'+this.state.locationId+'/favourite',{
                    method:'POST',
                    headers:{
                        'X-Authorization': authKey
                    }
                })
                .then(response => {
                    if(response.ok){
                        this.setState({isFavourite:true});
                    }
                })
            } else{
                fetch('http://10.0.2.2:3333/api/1.0.0/location/'+this.state.locationId+'/favourite',{
                    method:'DELETE',
                    headers:{
                        'X-Authorization': authKey
                    }
                })
                .then(response => {
                    if(response.ok){
                        this.setState({isFavourite:false});
                    }
                })
            }   
        })
    }

    getAuthKey = async () => {
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
                                    <TouchableOpacity onPress={this.favouriteLocation}>
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
                        <TouchableOpacity onPress={this.openWriteReview}>
                            <IonIcons name='md-add' size={30} color='black'/>     
                        </TouchableOpacity>
                    </Right>
                    </Row>
                    <Row>
                        <Reviews reviews={this.props.route.params.data.location_reviews} locationId={this.state.locationId} navigation={this.props.navigation}/>
                    </Row>
                </Grid>
            </Content>
        )
    };
}

export default ShopScreen;