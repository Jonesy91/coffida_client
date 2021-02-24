/* eslint-disable react/jsx-filename-extension */
/* eslint-disable linebreak-style */
import React, { useState } from 'react';
import {
  Text, Item, Label, Input, Content, Form, Button, Spinner, H1, Toast
} from 'native-base';
import { useAuthDispatch } from '../utilities/auth/AuthContext';
import { signOut } from '../utilities/auth/AuthService';
import { getUser, patchUser } from '../utilities/api/APIUtility';
import { getAuthToken, getUserId }from '../utilities/asyncstorage/AsyncStorageUtil';
import styles from '../style/screens/AccountScreenStyle';
import { displayMessage } from '../utilities/error/errorHandler';

export default function AccountScreen(){
  const dispatch = useAuthDispatch();
  const [firstName, setFirstName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newFirstName, setNewirstName] = useState('');
  const [newSurname, setNewSurname] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const requestAccount = async () => {
    setIsLoading(true);
    const token = await getAuthToken();
    const userId = await getUserId();
    getUser(userId, token)
      .then(data => {
        setFirstName(data.first_name);
        setSurname(data.last_name);
        setEmail(data.email);
      })
      .catch(error => {
        if(error.status === 404){
          displayMessage('User not found');
        } else {
          displayMessage('Failed to get user')
        }
      })
    setIsLoading(false);
  }

  const changePassword = async () => {
    const { body } = { password:newPassword };
    const token = await getAuthToken();
    const userId = await getUserId();
    patchUser(userId, token, body)
      .then(
        setNewPassword(''),
        setPassword('')
      )
      .catch(error => {
        if(error === 400){
          displayMessage('Please check you new password is valid');
        } else if (error === 401 || error === 403) {
          displayMessage('You do not have access to change passwords')
        }  else {
          displayMessage('Failed to change password');
        }
      })
  }

  const changeDetails = async () => {
    const body = {};
    if (newFirstName !== null) {
      body.first_name = newFirstName;
    } else if (newSurname !== null) {
      body.last_name = newSurname;
    } else if (newEmail !== null) {
      body.email = newEmail;
    }
    const token = await getAuthToken();
    const userId = await getUserId();
    patchUser(userId, token, body)
      .then(() => {
        setNewirstName(null);
        setNewSurname(null);
        setNewEmail(null);
      })
      .catch(error => {
        if(error === 400){
          displayMessage('Please check your new email is valid');
        } else if (error === 401 || error === 403) {
          displayMessage('You do not have access to change user details');
        } else {
          displayMessage('Failed to update details');
        }
      })
  }

  React.useEffect(() => {
    requestAccount();
  },[]);

  const logOut = async () => {
    await signOut()
      .then(() => dispatch({ type: 'SIGN_OUT' })
    )
    .catch(error => {
      displayMessage('Failed to log out');
    })
    
  }

  return (
    <Content style={styles.content}>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <H1>Account</H1>
          <Form>
            <Label style={styles.label}>First Name</Label>
            <Item>
              <Input
                defaultValue={firstName}
                onChangeText={(inFirstName) => setNewirstName(inFirstName)}
              />
            </Item>
            <Label style={styles.label}>Surname</Label>
            <Item >
              <Input
                defaultValue={surname}
                onChangeText={(inSurname) => setNewSurname(inSurname)}
              />
            </Item>
            <Label style={styles.label}>Email</Label>
            <Item>
              <Input
                defaultValue={email}
                onChangeText={(inEmail) => setNewEmail(inEmail)}
              />
            </Item>
          </Form>
          <Button 
            primary
            block 
            onPress={() => {changeDetails()}} 
            style={styles.button}
          >
            <Text>Update Details</Text>
          </Button>
          <Label style={styles.label}>Change Password</Label>
          <Item>
            <Input
              placeholder='Type password here'
              defaultValue={password}
              onChangeText={(inPassword) => setNewPassword(inPassword)}
            />
          </Item>
          <Button 
            primary
            block 
            onPress={() => {changePassword()}} 
            style={styles.button}
          >
            <Text>Change Password</Text>
          </Button>
          <Button 
            primary
            block 
            onPress={() => {logOut()}} 
            style={styles.button}
          >
            <Text>Log Out</Text>
          </Button>
      </>
      )}
      </Content>  
  );
}
