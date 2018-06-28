import React, { Component } from "react";
import { Card, CardSection, Button } from "./common";
import { connect } from "react-redux";
import { employeeUpdate, employeeCreation } from "../actions";
import EmployeeForm from './EmployeeForm';

class EmployeeCreation extends Component {
  onCreateEmployee=()=>{
    const {name, phone, shift} = this.props;
    this.props.employeeCreation({name, phone, shift: shift || 'Monday'});
  };

  render() {
    console.log(this.props);
    return (
      //{...this.props} passes all props in the parent component to it's child
      <Card>
        <EmployeeForm {...this.props}/>
        <CardSection>
          <Button text="Create" onPress={this.onCreateEmployee}/>
        </CardSection>
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
  { employeeUpdate, employeeCreation }
)(EmployeeCreation);
