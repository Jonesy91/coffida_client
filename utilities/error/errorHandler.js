import { Toast }  from 'native-base';

const displayMessage = (message) => {
    Toast.show({
        text: message,
        buttonText: 'Okay',
        duration: 3000,
        buttonStyle: { backgroundColor: '#4391ab'}
    })
}

export { displayMessage }