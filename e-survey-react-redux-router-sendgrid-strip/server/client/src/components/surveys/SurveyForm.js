import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { Link } from "react-router-dom";
import SurveyField from "./SurveyField";
import formFields from "./formFields";

// const regex = /(.+)@(.+){2,}\.(.+){2,}/;

class SurveyForm extends Component {
  render() {
    return (
      <div>
        {/*handleSubmit is a prop method provided by redux-form*/}
        <form onSubmit={this.props.handleSubmit(this.props.onNext)}>
          {/*"name" becomes the key of input value*/}

          {formFields.map(({ name, label }) => {
            return (
              <Field
                type="text"
                key={name}
                name={name}
                label={label}
                component={SurveyField}
              />
            );
          })}
          <div style={{ margin: "0 10px" }}>
            <Link to="/surveys" className="left btn">
              Cancel
              <i className="left material-icons">clear</i>
            </Link>
            <button type="submit" className="right btn">
              Next
              <i className="right material-icons">chevron_right</i>
            </button>
          </div>
        </form>
      </div>
    );
  }
}
//validate will check object values from
// this.props.handleSubmit(values=>{})
const validate = values => {
  let errors = {};

  formFields.forEach(({ name, label }) => {
    if (!values[name]) {
      //redux form automatically transfer the error message to
      // the named props on the form
      errors[name] = `Sorry, ${label} cannot be empty!`;
    }
  });

  // const emails = values.emails;
  // const invalidEmails = emails
  //   .split(",")
  //   .map(email => email.trim())
  //   .filter(email => !regex.test(email));
  // if (invalidEmails.length > 0) {
  //   errors[emails] = `Found invalid emails: ${invalidEmails}`;
  // }
  //redux validate will think the form is valid if errors is empty
  return errors;
};

export default reduxForm({
  validate,
  form: "surveyForm",
  //prevent form validation until onSubmit
  touchOnBlur: false,
  //this persist form after coming back
  destroyOnUnmount: false
})(SurveyForm);
