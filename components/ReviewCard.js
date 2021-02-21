/* eslint-disable react/jsx-filename-extension */
/* eslint-disable linebreak-style */
import {
  Card, CardItem, Body, Text, Button, Icon, Right
} from 'native-base';
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import Ratings from './Ratings';
import { like, unLike } from '../Utilities/APIUtility';
import { getAuthToken } from '../Utilities/AsyncStorageUtil';

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
    const token = await getAuthToken();
      if (this.state.isLiked === false) {
        like(this.state.locationId, this.state.reviewId, token )
        .then((response) => {
          if (response.ok) {
            this.setState({ isLiked: true });
            this.setState({likes: this.state.likes + 1})
          }
        });
      } else {
        unLike(this.state.locationId, this.state.reviewId, token )
        .then((response) => {
          if (response.ok) {
            this.setState({ isLiked: false });
            this.setState({likes: this.state.likes - 1})
          }
        });
      }
  }

  isLiked() {
    let iconName;
    if (this.state.isLiked === true) {
      iconName = 'md-thumbs-up';
    } else {
      iconName = 'md-thumbs-up-outline';
    }
    return iconName;
  }

  getPhoto() {
    

  }

  render() {
    const reviewBody = this.props.review.review_body;
    const review = this.props.review;
    const locationId = this.state.locationId;
    return (
      <Card>
        {this.state.usersReview && (
          <CardItem style={styles.elipsesItem}>
            <Right>
              <Button transparent onPress={() => this.props.navigation.navigate('modal',{review, locationId})} style={styles.elipsesBtn}>
                <Icon name='md-ellipsis-horizontal' style={styles.icon} />
              </Button>
            </Right>
          </CardItem>
        )}
        <CardItem>
          <Body>
            <Text>{reviewBody}</Text>
          </Body>
        </CardItem>
        <CardItem>
          <Ratings ratings={this.state.ratings} />
        </CardItem>
        <CardItem>
          <Button transparent onPress={() => {this.likeReview()}}>
            <Icon name={this.isLiked()} style={styles.icon} />
          </Button>
          <Text>{this.state.likes}</Text>
        </CardItem>
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  icon: {
    fontSize: 30,
    color: '#4391ab'
  },
  elipsesItem: {
    flex:1,
    justifyContent:'flex-end',
    alignItems:'flex-end',
  },
  elipsesBtn:{
    height:10
  }
});

export default ReviewCard;
