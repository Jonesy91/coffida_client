/* eslint-disable react/jsx-filename-extension */
/* eslint-disable linebreak-style */
import React, { Component } from 'react';
import {
  Text, Item, Label, Input, Content, Form, Button,
} from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';

class AccountScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      surname: '',
      email: '',
      newFirstName: null,
      newSurname: null,
      newEmail: null,
      newPassword: null,
    };
  }

  componentDidMount() {
    this.requestAccount();
  }

  async getUserData() {
    const id = await AsyncStorage.getItem('@userId');
    const token = await AsyncStorage.getItem('@userKey');
    const data = { id, token };
    return data;
  }

  requestAccount() {
    this.getUserData().then((userData) => {
      const url = `http://10.0.2.2:3333/api/1.0.0/user/${userData.id}`;
      fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': userData.token,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          this.setState({
            firstName: data.first_name,
            surname: data.last_name,
            email: data.email,
          });
        });
    });
  }

  logOut() {
    this.getUserData().then((userData) => {
      const url = 'http://10.0.2.2:3333/api/1.0.0/user/logout';
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': userData.token,
        },
      })
        .then(() => {
          this.clearUserStorage();
        });
    });
  }

  async clearUserStorage() {
    const keys = ['@userId', '@userKey'];
    await AsyncStorage.multiRemove(keys, (err) => {});
  }

  async changePassword() {
    const { body } = { password: this.state.password };
    this.getUserData().then((userData) => {
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
          this.setState({ password: '' });
        });
    });
  }

  changeDetails() {
    const body = {};
    if (this.state.newFirstName !== null) {
      body.first_name = this.state.newFirstName;
    } else if (this.state.newSurName !== null) {
      body.last_name = this.state.newSurname;
    } else if (this.state.newEmail !== null) {
      body.email = this.state.email;
    }
    this.getUserData().then((userData) => {
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
          this.setState({ newFirstName: null, newSurname: null, newEmail: null });
        });
    });
  }

  render() {
    return (
      <Content>
        <Text>Account</Text>
        <Form>
          <Label>First Name</Label>
          <Item rounded>
            <Input
              defaultValue={this.state.firstName}
              onChangeText={(firstName) => this.setState({ newFirstName: firstName })}
            />
          </Item>
          <Label>Surname</Label>
          <Item rounded>
            <Input
              defaultValue={this.state.surname}
              onChangeText={(surname) => this.setState({ newSurname: surname })}
            />
          </Item>
          <Label>Email</Label>
          <Item rounded>
            <Input
              defaultValue={this.state.email}
              onChangeText={(email) => this.setState({ newEmail: email })}
            />
          </Item>
        </Form>
        <Button rounded onPress={() => {this.changeDetails()}}><Text>Update Details</Text></Button>
        <Label>Change Password</Label>
        <Item rounded>
          <Input
            defaultValue={this.state.newPassword}
            onChangeText={(password) => this.setState({ newPassword: password })}
          />
        </Item>
        <Button rounded onPress={() => {this.changePassword()}}><Text>Change Password</Text></Button>
        <Button rounded onPress={() => {this.logOut()}}><Text>Log Out</Text></Button>
      </Content>
    );
  }
}

export default AccountScreen;
