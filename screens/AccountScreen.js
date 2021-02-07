/* eslint-disable react/jsx-filename-extension */
/* eslint-disable linebreak-style */
import React, { useState } from 'react';
import {
  Text, Item, Label, Input, Content, Form, Button,
} from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuthDispatch } from '../navigation/AuthContext';
import { signOut } from '../navigation/AuthService';

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
  const [loading, setLoading] = useState(false);

  const getUserData = async () => {
    const id = await AsyncStorage.getItem('@userId');
    const token = await AsyncStorage.getItem('@userKey');
    const data = { id, token };
    return data;
  }

  const requestAccount = async () => {
    getUserData().then((userData) => {
      const url = `http://10.0.2.2:3333/api/1.0.0/user/${userData.id}`;
      fetch(url, {
        method: 'GET',
        headers: {
          'X-Authorization': userData.token,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setFirstName(data.first_name);
          setSurname(data.last_name);
          setEmail(data.email);
        });
    });
  }

  const changePassword = async () => {
    const { body } = { password:password };
    getUserData().then((userData) => {
      const url = `http://10.0.2.2:3333/api/1.0.0/user/${userData.id}`;
      fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': userData.token,
        },
        body: JSON.stringify(body),
      })
        .then(() => {
          setPassword('');
        });
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
      const url = `http://10.0.2.2:3333/api/1.0.0/user/${userData.id}`;
      fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': userData.token,
        },
        body: JSON.stringify(body),
      })
        .then(() => {
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
          defaultValue={newPassword}
          onChangeText={(inPassword) => setNewPassword(inPassword)}
        />
      </Item>
      <Button rounded onPress={() => {changePassword()}}><Text>Change Password</Text></Button>
      <Button rounded onPress={() => {logOut()}}><Text>Log Out</Text></Button>
    </Content>
  );
}