import React, { Component } from 'react';
import { Image } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import IonIcons from 'react-native-vector-icons/Ionicons';
import StarRating from 'react-native-star-rating';
import { TouchableOpacity } from 'react-native-gesture-handler';

class ShopCard extends Component{
    render(){
        let bookmarkType ='md-bookmark-outline';
        if(this.props.favourite === true){
            bookmarkType='md-bookmark'                                
        }
        return(
            <Card>
                <CardItem>
                    <Left>
                        <Body>
                            <Text>{this.props.location.location_name}</Text>
                            <Text note>{this.props.location.location_town}</Text>
                        </Body>
                    </Left>
                    <Right>
                        <IonIcons name={bookmarkType} size={20}/>   
                    </Right>
                </CardItem>
                <CardItem cardBody>
                    <Image source={{uri:this.props.location.photo_path}} style={{height: 200, width: null, flex: 1}} />
                </CardItem>
                <CardItem>
                    <Left>
                        <StarRating
                            disabled={false}
                            maxStars={5}
                            rating={this.props.location.avg_overall_rating}
                            emptyStar={'ios-star-outline'}
                            fullStar={'ios-star'}
                            halfStar={'ios-star-half'}
                            iconSet={'Ionicons'}
                            fullStarColor={'gold'}
                            starSize={20}
                        />
                    </Left>
                </CardItem>
            </Card>
        );
    }
}

export default ShopCard;