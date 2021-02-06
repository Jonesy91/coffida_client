/* eslint-disable linebreak-style */
import React, { Component } from 'react';
import { Content } from 'native-base';
import ReviewCard from './ReviewCard';

class Reviews extends Component {
  isLiked(reviewId){
    let liked = false;
    if(this.props.likes !== null){
      if(this.props.likes.reviewIds.includes(reviewId)){
        liked = true;
      }
    }
    return liked;
  }
  
  render(){
    return (
      <Content>
        {this.props.reviews.map((review) => {
          return <ReviewCard key={review.review_id} review={review} locationId={this.props.locationId} liked={this.isLiked(review.review_id)}/>
          }
        )}
      </Content>
    );
  }
}

export default Reviews;