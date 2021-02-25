/* eslint-disable react/jsx-filename-extension */
/* eslint-disable linebreak-style */
import React, { useState } from 'react';
import {
  Text, Item, Label, Input, Content, Form, Button, Spinner, H1
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
  const [newFirstName, setNewirstName] = useState(null);
  const [newSurname, setNewSurname] = useState(null);
  const [newEmail, setNewEmail] = useState(null);
  const [newPassword, setNewPassword] = useState(null);
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

  const validatePassword = (inPassword) => {
    if(inPassword.length < 6) {
      displayMessage('Minimum password length is 6 characters');
      return false;
    }
    return true; 
  }

  const changePassword = async () => {
    const body = { password:newPassword };
    const token = await getAuthToken();
    const userId = await getUserId();
    if(validatePassword(newPassword)){
      patchUser(userId, token, body)
        .then(() => {
          setNewPassword(null);
          setPassword(null);
        })
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
  }

  const validateDetails = (inBody) => {
    const {first_name = null, last_name = null, email = null} = inBody;
    if(first_name !== null){
      if(first_name === ''){
        displayMessage('Please enter a first name');
        return false;
      }
    }
    if(last_name !== null){
      if(last_name === ''){
        displayMessage('Please enter a surname');
        return false;
      }  
    }
    if(email !== null){
      if(email === '' || !email.includes('@')){
        displayMessage('Please check your new email is valid');
        return false;
      }
    }
    return true;
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
    if(validateDetails(body)){
      patchUser(userId, token, body)
        .then(() => {
          displayMessage('Details updated');
          setNewirstName(null);
          setNewSurname(null);
          setNewEmail(null);
        })
        .catch(error => {
          if(error === 400){
            displayMessage('Please check your detais');
          } else if (error === 401 || error === 403) {
            displayMessage('You do not have access to change user details');
          } else {
            displayMessage('Failed to update details');
          }
        })
    }
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
          {newFirstName === null && newSurname === null && newEmail === null ? (
            <Button 
              block
              disabled 
              style={styles.button}
            >
              <Text>Update Details</Text>
            </Button>  
          ) : (
            <Button 
              primary
              block 
              onPress={() => {changeDetails()}} 
              style={styles.button}
            >
              <Text>Update Details</Text>
            </Button>
          )}
          <Label style={styles.label}>Change Password</Label>
          <Item>
            <Input
              placeholder='Type password here'
              defaultValue={password}
              onChangeText={(inPassword) => setNewPassword(inPassword)}
            />
          </Item>
          {newPassword === null ? (
            <Button 
            disabled
            block 
            style={styles.button}
            >
              <Text>Change Password</Text>  
            </Button>
          ) : (
            <Button 
              primary
              block 
              onPress={() => {changePassword()}} 
              style={styles.button}
            >
              <Text>Change Password</Text>
            </Button>
          )}
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
