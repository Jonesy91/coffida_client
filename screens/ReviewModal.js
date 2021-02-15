/* eslint-disable react/jsx-filename-extension */
import { Button, Container, Content, Text } from 'native-base';
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { deleteReview } from '../Utilities/APIUtility';

export default function ReviewModal({ route, navigation }){
    const review = route.params.review;
    const locationId = route.params.locationId;

    const deleteAReview = () => {
        deleteReview(review.review_id, locationId)
            .then(() => {
                Toast.show({
                    text: 'Review deleted',
                    buttonText: 'Okay',
                    duration: 3000,
                    buttonStyle: { backgroundColor: '#4391ab'}
                })
            })
            .catch((error) => {
                Toast.show({
                    text: 'Unable to delete review',
                    buttonText: 'Okay',
                    duration: 3000,
                    buttonStyle: { backgroundColor: '#4391ab'}
                })
            })
    }

    return(
            <Content contentContainerStyle={styles.content}>
                <Button block onPress={() => navigation.navigate('updateReview', {review,locationId})} style={styles.updatebutton}>
                    <Text>Update Review</Text>
                </Button>
                <Button block onPress={() => deleteAReview()} style={styles.delbutton}>
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