/* eslint-disable react/jsx-filename-extension */
/* eslint-disable linebreak-style */
import React, { useState } from 'react';
import {
  Text, Item, Label, Input, Content, Form, Button, Spinner, H1, Toast
} from 'native-base';
import { StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuthDispatch } from '../navigation/AuthContext';
import { signOut } from '../navigation/AuthService';
import { getUser, patchUser } from '../Utilities/APIUtility';

export default function AccountScreen(){
  const dispatch = useAuthDispatch();
  const [firstName, setFirstName] = React.useState('');
  const [surname, setSurname] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [newFirstName, setNewirstName] = React.useState('');
  const [newSurname, setNewSurname] = React.useState('');
  const [newEmail, setNewEmail] = React.useState('');
  const [newPassword, setNewPassword] = React.useState('');
  const [isLoading, setIsLoading] = useState(true);

  const getUserData = async () => {
    const id = await AsyncStorage.getItem('@userId');
    const token = await AsyncStorage.getItem('@userKey');
    const data = { id, token };
    return data;
  }

  const requestAccount = async () => {
    setIsLoading(true);
    getUserData().then((userData) => {
      getUser(userData.id, userData.token)
        .then(data => {
          setFirstName(data.first_name);
          setSurname(data.last_name);
          setEmail(data.email);
        })
        .catch(error => {
          if(error.status === 404){
            Toast.show({
              text: 'Unable to find user',
              buttonText: 'Okay',
              duration: 3000,
              buttonStyle: { backgroundColor: '#4391ab'}
            })
          } else {
            Toast.show({
              text: 'Failed to get user details',
              buttonText: 'Okay',
              duration: 3000,
              buttonStyle: { backgroundColor: '#4391ab'}
            })
          }
        })
    });
    setIsLoading(false);
  }

  const changePassword = async () => {
    const { body } = { password:newPassword };
    getUserData()
      .then((userData) => {
        patchUser(userData.id, userData.token, body)
          .then(
            setNewPassword(''),
            setPassword('')
          )
          .catch(error => {
            Toast.show({
              text: 'Failed to change password',
              buttonText: 'Okay',
              duration: 3000,
              buttonStyle: { backgroundColor: '#4391ab'}
            })
          })
      }); 
  }

  const changeDetails = () => {
    const body = {};
    if (newFirstName !== null) {
      body.first_name = newFirstName;
    } else if (newSurname !== null) {
      body.last_name = newSurname;
    } else if (newEmail !== null) {
      body.email = newEmail;
    }
    getUserData().then((userData) => {
      patchUser(userData.id, userData.token, body).then(() => {
        setNewirstName(null);
        setNewSurname(null);
        setNewEmail(null);
      });
    });
  }

  React.useEffect(() => {
    requestAccount();
  });

  const logOut = async () => {
    await signOut()
      .then(() =>
        dispatch({ type: 'SIGN_OUT' })
      )
      .catch(error =>
        Toast.show({
          text: 'Failed to log out',
          buttonText: 'Okay',
          duration: 3000,
          buttonStyle: { backgroundColor: '#4391ab'}
      })
      )
    
  }

  return (
    <Content style={Styles.content}>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
        <H1>Account</H1>
      <Form>
        <Label style={Styles.label}>First Name</Label>
        <Item>
          <Input
            defaultValue={firstName}
            onChangeText={(inFirstName) => setNewirstName(inFirstName)}
          />
        </Item>
        <Label style={Styles.label}>Surname</Label>
        <Item >
          <Input
            defaultValue={surname}
            onChangeText={(inSurname) => setNewSurname(inSurname)}
          />
        </Item>
        <Label style={Styles.label}>Email</Label>
        <Item >
          <Input
            defaultValue={email}
            onChangeText={(inEmail) => setNewEmail(inEmail)}
          />
        </Item>
      </Form>
      <Button block onPress={() => {changeDetails()}} style={Styles.button}><Text>Update Details</Text></Button>
      <Label style={Styles.label}>Change Password</Label>
      <Item>
        <Input
          placeholder='Type password here'
          defaultValue={password}
          onChangeText={(inPassword) => setNewPassword(inPassword)}
        />
      </Item>
      <Button block onPress={() => {changePassword()}} style={Styles.button}><Text>Change Password</Text></Button>
      <Button block onPress={() => {logOut()}} style={Styles.button}><Text>Log Out</Text></Button>
      </>
      )}
      </Content>  
  );
}

const Styles = StyleSheet.create({
  content: {
    padding: 20,
    backgroundColor: 'white'
  },
  button:{
    backgroundColor:'#4391ab',
    margin: 20
  },
  label: {
    color: 'black',
    margin: 5,
    marginTop: 10
  }
});