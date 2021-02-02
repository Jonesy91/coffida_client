/* eslint-disable linebreak-style */
import React from 'react';
import { Content } from 'native-base';
import ReviewCard from './ReviewCard';

export default function Reviews({reviews, locationId}) {
  return (
    <Content>
      {reviews.map((review) => (
        <ReviewCard key={review.review_id} review={review} locationId={locationId} />
      ))}
    </Content>
  );
}
