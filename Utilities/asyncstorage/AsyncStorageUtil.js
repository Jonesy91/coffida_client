import AsyncStorage from '@react-native-async-storage/async-storage';
/* 
Gets the users Authentication token from the Async Storage
*/
const getAuthToken = async () => {
    const token = await AsyncStorage.getItem('@userKey');
    if(token === null){
       throw new Error();
    }
    return token;
}

/* 
Gets the userID from the Async Storage
*/
const getUserId = async () => {
    const token = await AsyncStorage.getItem('@userId');
    if(token === null){
        throw new Error();
    }
    return token;
}

/* 
Adds the user token into async storage
*/
const setAuthToken = async (token) => {
    await AsyncStorage.setItem('@userKey', token); 
}

/* 
adds the user id into async storage
*/
const setUserId = async (userId) => {
        await AsyncStorage.setItem('@userId', userId);
}

/* 
Removes the users token and id from async storage
*/
const deleteData = async () => {
    const keys = ['@userId', '@userKey'];
    await AsyncStorage.multiRemove(keys, (err) => {});
}

export {getAuthToken, getUserId, setAuthToken, setUserId, deleteData}