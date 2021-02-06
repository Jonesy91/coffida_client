/* eslint-disable linebreak-style */
import React from 'react';
import { Text, Grid, Row, Col } from 'native-base';
import StarRating from 'react-native-star-rating';

export default function Ratings({ratings}) {
  return (
    <Grid>
      <Grid>
        <Row>
          <Col style={{width:150}}>
          <Text>Overall</Text>
          </Col>
          <StarRating
            disabled={false}
            maxStars={5}
            rating={ratings.overall}
            emptyStar="ios-star-outline"
            fullStar="ios-star"
            halfStar="ios-star-half"
            iconSet="Ionicons"
            fullStarColor="gold"
            starSize={20}
          />
        </Row>
        <Row>
          <Col style={{width:150}}>
          <Text>Price</Text>
          </Col>
          <StarRating
            disabled={false}
            maxStars={5}
            rating={ratings.price}
            emptyStar="ios-star-outline"
            fullStar="ios-star"
            halfStar="ios-star-half"
            iconSet="Ionicons"
            fullStarColor="gold"
            starSize={20}
          />
          
        </Row>
        <Row>
          <Col style={{width:150}}>
          <Text>Quality</Text>
          </Col>
          <StarRating
            disabled={false}
            maxStars={5}
            rating={ratings.quality}
            emptyStar="ios-star-outline"
            fullStar="ios-star"
            halfStar="ios-star-half"
            iconSet="Ionicons"
            fullStarColor="gold"
            starSize={20}
          />
        </Row>
        <Row>
          <Col style={{width:150}}>
          <Text>Clenliness</Text>
          </Col>
          <StarRating
            disabled={false}
            maxStars={5}
            rating={ratings.clenliness}
            emptyStar="ios-star-outline"
            fullStar="ios-star"
            halfStar="ios-star-half"
            iconSet="Ionicons"
            fullStarColor="gold"
            starSize={20}
          />
        </Row>
      </Grid>
    </Grid>
  );
}
