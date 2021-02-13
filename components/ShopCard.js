/* eslint-disable linebreak-style */
import React from 'react';
import { Image, StyleSheet } from 'react-native';
import {
  Card, CardItem, Text, Left, Body, Right, Icon
} from 'native-base';
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
          <Icon name={bookmarkType} style={styles.icon} />
        </Right>
      </CardItem>
      <CardItem cardBody>
        <Image
          source={{ uri: location.photo_path }}
          style={styles.image}
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
            fullStarColor="#4391ab"
            emptyStarColor="#4391ab"
            starSize={20}
          />
          <Text style={styles.text}>{location.avg_overall_rating}/5</Text>
        </Left>        
      </CardItem>
    </Card>
  );
}

const styles = StyleSheet.create({
  image: {
    height: 200,
    width: null,
    flex: 1,
  },
  icon: {
    fontSize: 25,
    color: '#4391ab'
  },
  text:{
    color: '#4391ab'
  }
});
