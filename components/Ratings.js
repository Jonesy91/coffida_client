/* eslint-disable react/jsx-filename-extension */
/* eslint-disable linebreak-style */
import React from 'react';
import { Text, Grid, Row, Col } from 'native-base';
import StarRating from 'react-native-star-rating';
import styles from '../style/components/RatingsStyle';

/*
Ratings component renders four different ratings which are displayed using stars
to show the rating.
*/
export default function Ratings({ratings}) {
  const starColour = "#16bff7";
  const emptyStar="md-star-outline"
  const fullStar="md-star"
  const halfStar="md-star-half"
  const iconSet="Ionicons"

  return (
    <Grid>
      <Grid>
        <Row>
          <Col style={styles.col}>
          <Text>Overall</Text>
          </Col>
          <StarRating
            disabled={false}
            maxStars={5}
            rating={ratings.overall}
            emptyStar={emptyStar}
            fullStar={fullStar}
            halfStar={halfStar}
            iconSet={iconSet}
            fullStarColor={starColour}
            emptyStarColor={starColour}
            halfStarColor={starColour}
            starSize={20}
          />
        </Row>
        <Row>
          <Col style={styles.col}>
          <Text>Price</Text>
          </Col>
          <StarRating
            disabled={false}
            maxStars={5}
            rating={ratings.price}
            emptyStar={emptyStar}
            fullStar={fullStar}
            halfStar={halfStar}
            iconSet={iconSet}
            fullStarColor={starColour}
            emptyStarColor={starColour}
            halfStarColor={starColour}
            starSize={20}
          />
          
        </Row>
        <Row>
          <Col style={styles.col}>
          <Text>Quality</Text>
          </Col>
          <StarRating
            disabled={false}
            maxStars={5}
            rating={ratings.quality}
            emptyStar={emptyStar}
            fullStar={fullStar}
            halfStar={halfStar}
            iconSet={iconSet}
            fullStarColor={starColour}
            emptyStarColor={starColour}
            halfStarColor={starColour}
            starSize={20}
          />
        </Row>
        <Row>
          <Col style={styles.col}>
          <Text>Clenliness</Text>
          </Col>
          <StarRating
            disabled={false}
            maxStars={5}
            rating={ratings.clenliness}
            emptyStar={emptyStar}
            fullStar={fullStar}
            halfStar={halfStar}
            iconSet={iconSet}
            fullStarColor={starColour}
            emptyStarColor={starColour}
            halfStarColor={starColour}
            starSize={20}
          />
        </Row>
      </Grid>
    </Grid>
  );
}
