/* eslint-disable react/jsx-filename-extension */
import { Button, Content, Text, Toast, View } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';
import { deleteReview, deletePhoto } from '../../utilities/api/APIUtility';
import { getAuthToken } from '../../utilities/asyncstorage/AsyncStorageUtil';

export default function ReviewModal({ route, navigation }){
    const review = route.params.review;
    const locationId = route.params.locationId;

    const deleteAReview = async () => {
        const token = await getAuthToken();
        try{
            await deletePhoto(token, locationId, review.review_id)
            await deleteReview(review.review_id, locationId)
            Toast.show({
                text: 'Review deleted',
                buttonText: 'Okay',
                duration: 3000,                            
                buttonStyle: { backgroundColor: '#4391ab'}
            });
            navigation.goBack();
        } catch(error) {
            Toast.show({
                text: 'Failed to delete review',
                buttonText: 'Okay',
                duration: 3000,                            
                buttonStyle: { backgroundColor: '#4391ab'}
            });
        }
    }

    return(
        <Content contentContainerStyle={styles.content}>
            <View style={styles.actionView}>
                <Button block onPress={() => navigation.navigate('updateReview', {review,locationId})} style={styles.updatebutton}>
                    <Text>Update Review</Text>
                </Button>
                <Button block onPress={() => deleteAReview()} style={styles.delbutton}>
                    <Text>Delete Review</Text>
                </Button>
            </View>
            <View>
                <Button block onPress={() => navigation.goBack()} style={styles.button}>
                    <Text>Close</Text>
                </Button>
            </View>
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
    },
    actionView:{
        marginVertical:10
    }
});