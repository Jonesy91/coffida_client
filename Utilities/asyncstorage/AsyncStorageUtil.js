import AsyncStorage from '@react-native-async-storage/async-storage';

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