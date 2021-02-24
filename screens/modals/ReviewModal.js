/* eslint-disable react/jsx-filename-extension */
import { Button, Content, Text, Toast, View } from 'native-base';
import React from 'react';
import { deleteReview, deletePhoto } from '../../utilities/api/APIUtility';
import { getAuthToken } from '../../utilities/asyncstorage/AsyncStorageUtil';
import styles from '../../style/screens/ReviewModalStyle';
import displayMessage from '../../utilities/error/errorHandler';

export default function ReviewModal({ route, navigation }){
    const { review }  = route.params;
    const { locationId } = route.params;

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
            if(error === 404){
                displayMessage('Review/Photo not found');
            } else if (error === 401 || error === 403) {
                displayMessage('You cannot delete this review/photo')
            } else {
                displayMessage('Failed to delete review/photo');
            }
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