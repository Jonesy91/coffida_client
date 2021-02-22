/* eslint-disable react/jsx-filename-extension */
/* eslint-disable linebreak-style */
import React, { Component } from 'react';
import { Content } from 'native-base';
import ReviewCard from './ReviewCard';

class Reviews extends Component {
  isLiked(reviewId){
    const { likes } = this.props;
    let liked = false;
    if(likes !== null){
      if(likes.includes(reviewId)){
        liked = true;
      }
    }
    return liked;
  }

  isUsersReview(reviewId){
    const { userReviews } = this.props;
    let isUsers = false;
    if(userReviews !== null){
      if(userReviews.includes(reviewId)){
        isUsers = true;
      }
    }
    return isUsers;
  }
  
  render(){
    const { reviews, locationId, navigation } = this.props;
    return (
      <Content>
        {reviews.map((review) => {
          const liked = this.isLiked(review.review_id);
          const users = this.isUsersReview(review.review_id);
          return <ReviewCard key={review.review_id} review={review} locationId={locationId} liked={liked} usersReview={users} navigation={navigation}/>
          }
        )}
      </Content>
    );
  }
}

export default Reviews;