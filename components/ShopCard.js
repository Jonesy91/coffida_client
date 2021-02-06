/* eslint-disable linebreak-style */
import React from 'react';
import { Image } from 'react-native';
import {
  Card, CardItem, Text, Left, Body, Right, Icon
} from 'native-base';
import IonIcons from 'react-native-vector-icons/Ionicons';
import StarRating from 'react-native-star-rating';

export default function ShopCard({location, favourite}) {
  let bookmarkType = 'md-bookmark-outline';
  if (favourite === true) {
    bookmarkType = 'md-bookmark';
  }
  return (
    <Card>
      <CardItem>
        <Left>
          <Body>
            <Text>{location.location_name}</Text>
            <Text note>{location.location_town}</Text>
          </Body>
        </Left>
        <Right>
          <Icon name={bookmarkType} style={{fontSize:20, color:'black'}} />
        </Right>
      </CardItem>
      <CardItem cardBody>
        <Image
          source={{ uri: location.photo_path }}
          style={{ height: 200, width: null, flex: 1 }}
        />
      </CardItem>
      <CardItem>
        <Left>
          <StarRating
            disabled={false}
            maxStars={5}
            rating={location.avg_overall_rating}
            emptyStar="ios-star-outline"
            fullStar="ios-star"
            halfStar="ios-star-half"
            iconSet="Ionicons"
            fullStarColor="gold"
            starSize={20}
          />
        </Left>
      </CardItem>
    </Card>
  );
}
