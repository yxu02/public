import React from "react";
import { StyleSheet, View } from "react-native";
import SignUpForm from "./components/SignUpForm";
import SignInForm from "./components/SignInForm";
import firebase from "firebase";
import keys from "./config/keys";

export default class App extends React.Component {
  componentDidMount() {
    const {
      apiKey,
      authDomain,
      databaseURL,
      projectId,
      storageBucket,
      messagingSenderId
    } = keys;

    const config = {
      apiKey,
      authDomain,
      databaseURL,
      projectId,
      storageBucket,
      messagingSenderId
    };
    firebase.initializeApp(config);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.formStyle}>
          <SignUpForm />
          <View style={styles.formStyle}>
            <SignInForm />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  formStyle: {
    marginHorizontal: 10,
    marginTop: 40,
    marginBottom: 10
  }
});
