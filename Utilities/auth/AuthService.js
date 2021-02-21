import AsyncStorage from '@react-native-async-storage/async-storage';
import { logIn, logOut, register } from '../Utilities/APIUtility';

const signIn = async (data) => {
    try {
      return logIn(data).then( async (response) => {
        await AsyncStorage.setItem('@userId', response.id.toString());
        await AsyncStorage.setItem('@userKey', response.token);  
        return response;
      })    
    } catch (error) {
      throw new Error(error.message);
    }
  };
  
  const signUp = async (firstName, surname, email, password) => {
    try {
        const data = {first_name:firstName, last_name:surname, email:email, password:password};
        return register(data);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const signOut = async () => {
    try {
      const token = await AsyncStorage.getItem('@userKey');
      logOut(token).then(async() => {
        const keys = ['@userId', '@userKey'];
        await AsyncStorage.multiRemove(keys, (err) => {});
        return true;
      })
    } catch (error) {
      throw new Error(error.message);
    }
  };
  
  // const checkAuth = async () => {
  //   try {
      
  //   } catch (error) {
  //     throw new Error(error.message);
  //   }
  // };
  
  export { signIn, signOut, signUp};