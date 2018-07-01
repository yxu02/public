import React, { Component } from "react";
import { View, Text } from "react-native";
import { Button, FormInput, FormLabel } from "react-native-elements";
import axios from "axios";

const ROOT_URL = "https://us-central1-reactauth-30jun18.cloudfunctions.net";

export default class SignUpForm extends Component {
  //equals to constructor(){this.state={...}}
  state = { phone: "" };

  render() {
    return (
      <View>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Sign Up</Text>
        <FormLabel>Phone:</FormLabel>
        <FormInput
          value={this.state.phone}
          onChangeText={phone => this.setState({ phone })}
        />
        <Button title="Sign Up" onPress={this.onSignUp} />
      </View>
    );
  }

  onSignUp = async () => {
    try {
      await axios.post(`${ROOT_URL}/createUser`, this.state);
      await axios.post(`${ROOT_URL}/requestOTP`, this.state);
    } catch (e) {
      console.log(e);
    }
  };
}
