/* eslint-disable react/jsx-filename-extension */
/* eslint-disable linebreak-style */
import {
  Card, CardItem, Body, Text, Button, Icon, Right
} from 'native-base';
import React, { Component } from 'react';
import Ratings from './Ratings';
import { like, unLike } from '../utilities/api/APIUtility';
import { getAuthToken } from '../utilities/asyncstorage/AsyncStorageUtil';
import styles from '../style/components/ReviewCardStyle';

class ReviewCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ratings: {
        overall: this.props.review.overall_rating,
        price: this.props.review.price_rating,
        quality: this.props.review.quality_rating,
        clenliness: this.props.review.clenliness_rating,
      },
      isLiked: this.props.liked,
      reviewId: this.props.review.review_id,
      locationId: this.props.locationId,
      usersReview: this.props.usersReview,
      likes: this.props.review.likes
    };
  }

  async likeReview() {
    const { isLiked, locationId, reviewId, likes } = this.state;
    const token = await getAuthToken();
      if (isLiked === false) {
        like(locationId, reviewId, token )
        .then((response) => {
            this.setState({ isLiked: true });
            this.setState({likes: likes + 1})
        });
      } else {
        unLike(locationId, reviewId, token )
        .then((response) => {
            this.setState({ isLiked: false });
            this.setState({likes: likes - 1})
        });
      }
  }

  isLiked() {
    let iconName;
    const { isLiked } = this.state;
    if (isLiked === true) {
      iconName = 'md-thumbs-up';
    } else {
      iconName = 'md-thumbs-up-outline';
    }
    return iconName;
  }

  render() {
    const { review, navigation } = this.props;
    const { locationId, ratings, likes, usersReview } = this.state;
    return (
      <Card>
        {usersReview && (
          <CardItem style={styles.elipsesItem}>
            <Right>
              <Button transparent onPress={() => navigation.navigate('modal',{review, locationId})} style={styles.elipsesBtn}>
                <Icon name='md-ellipsis-horizontal' style={styles.icon} />
              </Button>
            </Right>
          </CardItem>
        )}
        <CardItem>
          <Body>
            <Text>{review.review_body}</Text>
          </Body>
        </CardItem>
        <CardItem>
          <Ratings ratings={ratings} />
        </CardItem>
        <CardItem>
          <Button transparent onPress={() => {this.likeReview()}}>
            <Icon name={this.isLiked()} style={styles.icon} />
          </Button>
          <Text>{likes}</Text>
        </CardItem>
      </Card>
    );
  }
}

export default ReviewCard;
