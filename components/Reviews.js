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

  isUsersReview(reviewId){
    let isUsers = false;
    if(this.props.userReviews !== null){
      if(this.props.userReviews.reviewIds.includes(reviewId)){
        isUsers = true;
      }
    }
    return isUsers;
  }
  
  render(){
    return (
      <Content>
        {this.props.reviews.map((review) => {
          return <ReviewCard key={review.review_id} review={review} locationId={this.props.locationId} liked={this.isLiked(review.review_id)} usersReview={this.isUsersReview(review.review_id)} nav={this.props.nav}/>
          }
        )}
      </Content>
    );
  }
}

export default Reviews;