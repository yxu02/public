import React, { Component } from "react";
import { View, Text } from "react-native";
import { Button, FormInput, FormLabel } from "react-native-elements";
import axios from "axios";
import firebase from 'firebase';

const ROOT_URL = "https://us-central1-reactauth-30jun18.cloudfunctions.net";

export default class SignInForm extends Component {
  //equals to constructor(){this.state={...}}
  state = { phone: "", code:"" };

  render() {
    return (
      <View>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Sign In</Text>
        <FormLabel>Phone:</FormLabel>
        <FormInput
          value={this.state.phone}
          onChangeText={phone => this.setState({ phone })}
        />
        <FormLabel>Code:</FormLabel>
        <FormInput
          value={this.state.code}
          onChangeText={code => this.setState({ code })}
        />
        <Button title="Sign In" onPress={this.onSignIn} />
      </View>
    );
  }

  onSignIn = async () => {
    try {
      const response = await axios.post(`${ROOT_URL}/verifyUserOTP`, this.state);

      await firebase.auth().signInWithCustomToken(response.data.token);
      console.log('user signed in!');
    } catch (e) {
      console.log(e);
    }
  };
}
