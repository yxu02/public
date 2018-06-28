import React, { Component } from "react";
import _ from "lodash";
import Communications from "react-native-communications";
import { Card, CardSection, Button, ModalConfirm } from "./common";
import { connect } from "react-redux";
import { employeeUpdate, employeePatch, employeeDelete } from "../actions";
import EmployeeForm from "./EmployeeForm";

class EmployeeEdit extends Component {
  state = { showModal: false };
  onPressText = () => {
    const { phone, shift } = this.props;

    Communications.text(phone, `Your upcoming shift is on ${shift}`);
  };
  onAccept = () => {
    this.props.employeeDelete({ uid: this.props.employee.uid });
  };
  onDecline = () => {
    this.setState({ showModal: false });
  };

  //update action creator with passed in this.props.employee
  componentWillMount() {
    _.each(this.props.employee, (value, prop) => {
      this.props.employeeUpdate({ prop, value });
    });
  }

  onEditEmployee = () => {
    const { name, phone, shift } = this.props;
    this.props.employeePatch({
      name,
      phone,
      shift,
      uid: this.props.employee.uid
    });
  };

  render() {
    return (
      //{...this.props} passes all props in the parent component to it's child
      <Card>
        <EmployeeForm {...this.props} />
        <CardSection>
          <Button text="Save" onPress={this.onEditEmployee} />
        </CardSection>
        <CardSection>
          <Button text="Text Schedule" onPress={this.onPressText} />
        </CardSection>
        <CardSection>
          <Button
            text="Fire Employee"
            onPress={() => this.setState({ showModal: !this.state.showModal })}
          />
        </CardSection>

        <ModalConfirm
          visible={this.state.showModal}
          onAccept={this.onAccept}
          onDecline={this.onDecline}
        >
          Are you sure you want to fire this employee and delete the record?
        </ModalConfirm>
      </Card>
    );
  }
}

const mapStateToProps = state => {
  const { name, phone, shift } = state.employeeForm;
  return { name, phone, shift };
};

export default connect(
  mapStateToProps,
  { employeeUpdate, employeePatch, employeeDelete }
)(EmployeeEdit);
