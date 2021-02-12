/* eslint-disable react/jsx-filename-extension */
/* eslint-disable linebreak-style */
import {
  Card, CardItem, Body, Text, Button, Icon, Right, Header
} from 'native-base';
import React, { Component } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ratings from './Ratings';

class ReviewCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ratings: {
        overall: this.props.review.review_overallrating,
        price: this.props.review.review_pricerating,
        quality: this.props.review.review_qualityrating,
        clenliness: this.props.review.review_clenlinessrating,
      },
      isLiked: this.props.liked,
      reviewId: this.props.review.review_id,
      locationId: this.props.locationId,
      usersReview: this.props.usersReview
    };
  }

   async getAuthKey() {
    try {
      const token = await AsyncStorage.getItem('@userKey');
      if (this.token === null) {
        throw error('null object');
      }
      return token;
    } catch (e) {
      return e;
    }
  }

  async likeReview() {
    const authKey = await this.getAuthKey();
      if (this.state.isLiked === false) {
        fetch(`http://10.0.2.2:3333/api/1.0.0/location/${this.state.locationId}/review/${this.state.reviewId}/like`, {
          method: 'POST',
          headers: {
            'X-Authorization': authKey,
          },
        })
          .then((response) => {
            if (response.ok) {
              this.setState({ isLiked: true });
            }
          });
      } else {
        fetch(`http://10.0.2.2:3333/api/1.0.0/location/${this.state.locationId}/review/${this.state.reviewId}/like`, {
          method: 'DELETE',
          headers: {
            'X-Authorization': authKey,
          },
        })
          .then((response) => {
            if (response.ok) {
              this.setState({ isLiked: false });
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

  render() {
    const reviewBody = this.props.review.review_body;
    const review = this.props.review;
    const locationId = this.state.locationId;
    return (
      <Card>
        {this.state.usersReview && (
          <CardItem>
            <Right>
              <Button small transparent onPress={() => this.props.nav.navigate('modal',{review, locationId})}>
                <Icon name='md-ellipsis-horizontal' style={{fontSize:30 }} />
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
            <Icon name={this.isLiked()} style={{fontSize:20}} />
          </Button>
          <Text>{this.props.review.likes}</Text>
        </CardItem>
      </Card>
    );
  }
}

export default ReviewCard;
