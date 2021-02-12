/* eslint-disable react/jsx-filename-extension */
import { Button, Content, Text } from 'native-base';
import React, { Component } from 'react';
import { deleteReview } from '../Utilities/APIUtility';

export default function ReviewModal({ route, navigation }){
    const review = route.params.review;
    const locationId = route.params.locationId;
    return(
        <Content>
            <Button block onPress={() => navigation.navigate('updateReview', {review,locationId})}><Text>Update Review</Text></Button>
            <Button block onPress={() => deleteReview(review.review_id, locationId)}><Text>Delete</Text></Button>
        </Content>
    ); 
}