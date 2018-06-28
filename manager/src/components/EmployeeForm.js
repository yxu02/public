import React, { Component } from "react";
import { Picker, Text, View } from "react-native";
import { CardSection, TextInputBox} from "./common";
import { connect } from "react-redux";
import { employeeUpdate} from "../actions";

class EmployeeForm extends Component {

  render() {
    const { name, phone, shift, employeeUpdate } = this.props;
    return (
      <View>
        <CardSection>
          <TextInputBox
            label="Name"
            placeholder="Enter name"
            autoCorrect={false}
            onChangeText={value => employeeUpdate({ prop: "name", value })}
            value={name}
          />
        </CardSection>

        <CardSection>
          <TextInputBox
            label="Phone"
            placeholder="Enter phone number"
            onChangeText={value => employeeUpdate({ prop: "phone", value })}
            value={phone}
          />
        </CardSection>

        <CardSection style={{ flexDirection: "column" }}>
          <Text style={{ fontSize: 18, paddingLeft: 20 }}>Shift</Text>
          <Picker
            // style={{ flex: 1 }}  if here picker will be displayed below the save button
            selectedValue={shift}
            onValueChange={value => employeeUpdate({ prop: "shift", value })}
          >
            <Picker.Item label="Monday" value="Monday" />
            <Picker.Item label="Tuesday" value="Tuesday" />
            <Picker.Item label="Wednesday" value="Wednesday" />
            <Picker.Item label="Thursday" value="Thursday" />
            <Picker.Item label="Friday" value="Friday" />
            <Picker.Item label="Saturday" value="Saturday" />
            <Picker.Item label="Sunday" value="Sunday" />
          </Picker>
        </CardSection>
      </View>
    );
  }
}

const mapStateToProps = state => {
  const { name, phone, shift } = state.employeeForm;
  return { name, phone, shift };
};

export default connect(
  mapStateToProps,
  { employeeUpdate }
)(EmployeeForm);
