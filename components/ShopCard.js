import React, { Component } from 'react';
import { Image } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import IonIcons from 'react-native-vector-icons/Ionicons';

class ShopCard extends Component{
    render(){
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
                        <IonIcons name='md-bookmark-outline'/>
                    </Right>
                </CardItem>
                <CardItem cardBody>
                    <Image source={{uri:this.props.location.photo_path}} style={{height: 200, width: null, flex: 1}} />
                </CardItem>
                <CardItem>
                    <Left>
                        <Text>{this.props.location.avg_overall_rating}</Text>
                    </Left>
                </CardItem>
            </Card>
        );
    }
}

export default ShopCard;