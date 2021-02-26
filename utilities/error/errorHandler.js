import { Toast }  from 'native-base';

/* 
Displays a toast message using the message provided.
*/
const displayMessage = (message) => {
    Toast.show({
        text: message,
        buttonText: 'Okay',
        duration: 3000,
        buttonStyle: { backgroundColor: '#4391ab'}
    })
}

export { displayMessage }