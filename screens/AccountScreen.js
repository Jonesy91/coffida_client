/* eslint-disable react/jsx-filename-extension */
/* eslint-disable linebreak-style */
import React, { useState } from 'react';
import {
  Text, Item, Label, Input, Content, Form, Button, Spinner
} from 'native-base';
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
      getUser(userData.id, userData.token).then(data => {
        setFirstName(data.first_name);
        setSurname(data.last_name);
        setEmail(data.email);
      });
    });
    setIsLoading(false);
  }

  const changePassword = async () => {
    const { body } = { password:newPassword };
    getUserData().then((userData) => {
      patchUser(userData.id, userData.token, body).then(
        setNewPassword(''),
        setPassword('')
      )
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
    await signOut();
    dispatch({ type: 'SIGN_OUT' });
  }

  return (
    <Content>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
        <Text>Account</Text>
      <Form>
        <Label>First Name</Label>
        <Item rounded>
          <Input
            defaultValue={firstName}
            onChangeText={(inFirstName) => setNewirstName(inFirstName)}
          />
        </Item>
        <Label>Surname</Label>
        <Item rounded>
          <Input
            defaultValue={surname}
            onChangeText={(inSurname) => setNewSurname(inSurname)}
          />
        </Item>
        <Label>Email</Label>
        <Item rounded>
          <Input
            defaultValue={email}
            onChangeText={(inEmail) => setNewEmail(inEmail)}
          />
        </Item>
      </Form>
      <Button rounded onPress={() => {changeDetails()}}><Text>Update Details</Text></Button>
      <Label>Change Password</Label>
      <Item rounded>
        <Input
          defaultValue={password}
          onChangeText={(inPassword) => setNewPassword(inPassword)}
        />
      </Item>
      <Button rounded onPress={() => {changePassword()}}><Text>Change Password</Text></Button>
      <Button rounded onPress={() => {logOut()}}><Text>Log Out</Text></Button>
      </>
      )}
      </Content>  
  );
}