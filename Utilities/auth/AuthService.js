/* eslint-disable no-useless-catch */
import { logIn, logOut, register } from '../api/APIUtility';
import { getAuthToken, setAuthToken, setUserId, deleteData } from '../asyncstorage/AsyncStorageUtil';

/* 
Logs in the user
*/
const signIn = async (data) => {
    try {
      return logIn(data).then( async (response) => {
        await setUserId(response.id.toString());
        await setAuthToken(response.token);
        return response;
      })    
    } catch (error) {
      throw new Error(error.message);
    }
  };

/* 
Handles the registration of a new user
*/
const signUp = async (firstName, surname, email, password) => {
  try {
    const data = {first_name:firstName, last_name:surname, email, password};
    return await register(data);
  } catch (error) {
    throw error;
  }
};

/* 
Handles the log out of users
*/
const signOut = async () => {
  try {
    const token = await getAuthToken();
    logOut(token).then(async() => {
      deleteData();
      return true;
    })
  } catch (error) {
    throw new Error(error.message);
  }
};

  export { signIn, signOut, signUp};