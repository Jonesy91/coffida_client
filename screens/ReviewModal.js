/* eslint-disable react/jsx-filename-extension */
import { Button, Container, Content, Text } from 'native-base';
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { deleteReview } from '../Utilities/APIUtility';

export default function ReviewModal({ route, navigation }){
    const review = route.params.review;
    const locationId = route.params.locationId;
    return(
            <Content contentContainerStyle={styles.content}>
                <Button block onPress={() => navigation.navigate('updateReview', {review,locationId})} style={styles.updatebutton}>
                    <Text>Update Review</Text>
                </Button>
                <Button block onPress={() => deleteReview(review.review_id, locationId)} style={styles.delbutton}>
                    <Text>Delete</Text>
                </Button>
                <Button block onPress={() => navigation.goBack()} style={styles.button}>
                    <Text>Close</Text>
                </Button>
            </Content>
    ); 
}

const styles = StyleSheet.create({
    content:{
        flex:1,
        justifyContent: 'flex-end'
        
        
    },
    button:{
        backgroundColor: '#4391ab',
        marginHorizontal:20,
    },
    updatebutton:{
        backgroundColor: '#4391ab',
        marginHorizontal:20,
        borderBottomWidth:2,
        borderColor:'#2f6678',
    },
    delbutton:{
        borderBottomWidth:2,
        borderColor:'#2f6678',
        backgroundColor: '#4391ab',
        marginHorizontal:20,
    }
});