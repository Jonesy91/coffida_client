/* eslint-disable react/jsx-filename-extension */
/* eslint-disable linebreak-style */
import React, { useState, useEffect } from 'react';
import { Image } from 'react-native';
import {
  Card, CardItem, Text, Left, Body, Right, Icon
} from 'native-base';
import StarRating from 'react-native-star-rating';
import styles from '../style/components/ShopCardStyle';
import { calculateDistance } from '../utilities/location/LocationUtility';

export default function ShopCard({location, favourite, devLocation}) {
  const [distance, setDistance] = useState(0);
  const [bookmarkType, setBookmarkType] = useState('md-bookmark-outline');
  
  useEffect(() => {
    const resultDistance = calculateDistance(
      {latitude:devLocation.latitude, longitude:devLocation.longitude},
      {latitude:location.latitude, longitude:location.longitude},
    )
    setDistance(resultDistance.toFixed(2));

    if (favourite === true) {
      setBookmarkType('md-bookmark');
    }

    
  },[]);

  
  const getImage = () => {
    let { photo_path = '' } = location;
    if(photo_path === ''){
      return <Image source={require('../resources/images/SD-default-image.png')} style={styles.image} />
    }
    return <Image source={{ uri: photo_path }} style={styles.image} />
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
        {getImage()}
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
        </Left>
        <Right>
          <Text>{`${distance} km`}</Text>
        </Right>      
      </CardItem>
    </Card>
  );
}
