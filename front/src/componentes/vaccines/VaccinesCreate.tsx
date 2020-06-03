import React from "react";
import { Form, FormGroup } from "react-bootstrap";
import { Field, reduxForm } from "redux-form";
import DatePicker, { normalizeDates, formatDates } from "../shared/DatePicker";
import PrimaryButton from "../shared/PrimaryButton";
import { compose } from "redux";

interface Props {
  petId: number;
  handleSubmit: ({}) => any;
  onSubmit: (formValues: any) => void;
}

class VaccinesCreate extends React.Component<Props, any> {
  renderError({ error, touched }: { error: any; touched: any }) {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    } else {
      return;
    }
  }

  renderInput = ({
    input,
    label,
    meta,
  }: {
    input: any;
    label: any;
    meta: any;
  }) => {
    const className = `field ${meta.touched && meta.error ? "has-error" : ""}`;
    return (
      <div className={`form-group ${className}`}>
        <label htmlFor={input.name}>{label}</label>
        <input
          {...input}
          autoComplete="off"
          id={input.name}
          className={`form-control`}
          type={"password" === input.name ? "password" : "text"}
        />
        {this.renderError(meta)}
      </div>
    );
  };

  onSubmit = (formValues: any) => {
    this.props.onSubmit(formValues);
  };

  render() {
    return (
      <Form
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        className="ui form error"
      >
        <FormGroup className="form-group">
          <Field
            name="name"
            type="text"
            id="name"
            component={this.renderInput}
            label="Name"
          />
        </FormGroup>
        <FormGroup className="form-group">
          <Field
            name={"date"}
            id="date"
            component={DatePicker}
            placeholder="Date"
            parse={normalizeDates}
            format={formatDates}
          />
        </FormGroup>
        <PrimaryButton text="Save" isSubmit={true} onClick={() => 0} />
      </Form>
    );
  }
}

const validate = (formValues: any) => {
  const errors = { name: "", birthDate: "" };
  if (!formValues.name) {
    errors.name = "Name is required";
  }

  if (!formValues.birthDate) {
    errors.birthDate = "You must set a date";
  }

  return errors;
};

export default compose<any>(
  reduxForm({
    form: "createVaccineForm",
    validate,
  })
)(VaccinesCreate);
