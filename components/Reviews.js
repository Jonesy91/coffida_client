/* eslint-disable linebreak-style */
import React, { Component } from 'react';
import { Content } from 'native-base';
import ReviewCard from './ReviewCard';

class Reviews extends Component {
  isLiked(reviewId){
    let liked = false;
    if(this.props.likes !== null){
      if(this.props.likes.includes(reviewId)){
        liked = true;
      }
    }
    return liked;
  }

  isUsersReview(reviewId){
    let isUsers = false;
    if(this.props.userReviews !== null){
      if(this.props.userReviews.includes(reviewId)){
        isUsers = true;
      }
    }
    return isUsers;
  }
  
  render(){
    return (
      <Content>
        {this.props.reviews.map((review) => {
          const liked = this.isLiked(review.review_id);
          const users = this.isUsersReview(review.review_id);
          console.log(users)
          console.log(this.props.userReviews)
          return <ReviewCard key={review.review_id} review={review} locationId={this.props.locationId} liked={liked} usersReview={users} navigation={this.props.navigation}/>
          }
        )}
      </Content>
    );
  }
}

export default Reviews;