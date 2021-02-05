/* eslint-disable linebreak-style */
import {
  Card, CardItem, Body, Text,
} from 'native-base';
import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import IonIcons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ratings from './Ratings';

class ReviewCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ratings: {
        overall: props.review.review_overallrating,
        price: this.props.review.review_pricerating,
        quality: this.props.review.review_qualityrating,
        clenliness: this.props.review.review_clenlinessrating,
      },
      isLiked: this.props.liked,
      reviewId: this.props.review.review_id,
      locationId: this.props.locationId,
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
    console.log(authKey)
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
    return (
      <Card>
        <CardItem>
          <Body>
            <Text>{reviewBody}</Text>
          </Body>
        </CardItem>
        <CardItem>
          <Ratings ratings={this.state.ratings} />
        </CardItem>
        <CardItem>
          <TouchableOpacity onPress={() => {this.likeReview()}}>
            <IonIcons name={this.isLiked()} size={20} />
          </TouchableOpacity>
          <Text>{this.props.review.likes}</Text>
        </CardItem>
      </Card>
    );
  }
}

export default ReviewCard;
