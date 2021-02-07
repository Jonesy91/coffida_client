import AsyncStorage from '@react-native-async-storage/async-storage'

const signIn = async (data) => {
    try {
        const response = await fetch('http://10.0.2.2:3333/api/1.0.0/user/login',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
            });
        const json = await response.json();
        await AsyncStorage.setItem('@userId', json.id.toString());
        await AsyncStorage.setItem('@userKey', json.token);
        return json;
    } catch (error) {
      throw new Error(error.message);
    }
  };
  
  const signUp = async (firstName, surname, email, password) => {
    try {
        const data = {first_name:firstName, last_name:surname, email:email, password:password};
        const response = await fetch('http://10.0.2.2:3333/api/1.0.0/user',{
            method: 'POST',
            headers: {
               'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });        
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const signOut = async () => {
    try {
      const token = await AsyncStorage.getItem('@userKey');
      fetch('http://10.0.2.2:3333/api/1.0.0/user/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': token,
        },
      })
      .then(async (response) => {
        if(response.ok){
          const keys = ['@userId', '@userKey'];
          await AsyncStorage.multiRemove(keys, (err) => {});
          return true;
        }
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