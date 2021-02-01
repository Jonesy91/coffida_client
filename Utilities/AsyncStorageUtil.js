import AsyncStorage from '@react-native-async-storage/async-storage';

export async function async(){
    try{
        const token = await AsyncStorage.getItem('@userKey');
        if(token !== null){
            return token;
        }
        else{
            throw error('null object');
        }
    } catch (e) {
        console.log(e);
    }
}

export async function getUserData(){
    const id = await AsyncStorage.getItem('@userId');
    const token = await AsyncStorage.getItem('@userKey');
    const data = {id:id,token:token};
    return data;
}