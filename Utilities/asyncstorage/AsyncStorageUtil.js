import AsyncStorage from '@react-native-async-storage/async-storage';
/* 
Gets the users Authentication token from the Async Storage
*/
const getAuthToken = async () => {
    try{
        const token = await AsyncStorage.getItem('@userKey');
        if(token === null){
            throw new Error();
        }
        return token;
    } catch (e) {
        console.log(e);
    }
}

/* 
Gets the userID from the Async Storage
*/
const getUserId = async () => {
    try{
        const token = await AsyncStorage.getItem('@userId');
        if(token === null){
            throw new Error();
        }
        return token;
    } catch (e) {
        console.log(e);
    }
}


export {getAuthToken, getUserId}