//this LoginForm depends on redux.
import React, { Component } from "react";
import { Text } from "react-native";
import { connect } from "react-redux";
import { emailChanged, passwordChanged, loginUser } from "../actions";
import { Card, CardSection, TextInputBox, Button, Spinner } from "./common";

class LoginForm extends Component {
  onLoginUserRequest = () => {
    const { email, password } = this.props;
    this.props.loginUser({ email, password });
  };

  render() {
    const {
      email,
      password,
      error,
      loading,
      emailChanged,
      passwordChanged
    } = this.props;
    return (
      <Card>
        <CardSection>
          <TextInputBox
            label="Email"
            placeholder="Enter Email"
            autoCorrect={false}
            onChangeText={text => emailChanged(text)}
            value={email}
          />
        </CardSection>
        <CardSection>
          <TextInputBox
            label="Password"
            placeholder="Enter password"
            secureTextEntry
            onChangeText={text => passwordChanged(text)}
            value={password}
          />
        </CardSection>

        {error ? <Text style={styles.textStyles}>{error}</Text> : null}

        <CardSection>
          {loading ? (
            <Spinner size="small" />
          ) : (
            <Button onPress={this.onLoginUserRequest} text="Log in" />
          )}
        </CardSection>
      </Card>
    );
  }
}

const styles = {
  textStyles: {
    fontSize: 20,
    alignSelf: "center",
    color: "red"
  }
};

const mapStateToProps = state => {
  const { email, password, user, error, loading } = state.auth;
  return { email, password, user, error, loading };
};

export default connect(
  mapStateToProps,
  { emailChanged, passwordChanged, loginUser }
)(LoginForm);
