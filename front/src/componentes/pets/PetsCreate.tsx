import React from "react";
import { Form, FormGroup } from "react-bootstrap";
import { Field, reduxForm } from "redux-form";
import PrimaryButton from "../shared/PrimaryButton";
import DatePicker, { formatDates, normalizeDates } from "../shared/DatePicker";
import { compose } from "redux";

interface Props {
  onSubmit: (formValues: any) => void;
  handleSubmit: ({}) => any;
}

class PetsCreate extends React.Component<Props, any> {
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
    const className = `field ${meta.touched && meta.error ? "error" : ""}`;
    return (
      <div className="form-group">
        <label htmlFor={input.name}>{label}</label>
        <input
          {...input}
          autoComplete="off"
          id={input.name}
          className="form-control"
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
            name={"birthDate"}
            id="birthDate"
            component={DatePicker}
            placeholder="Birth date"
            parse={normalizeDates}
            format={formatDates}
          />
        </FormGroup>
        <PrimaryButton text="Guardar" isSubmit={true} onClick={() => 0} />
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
    form: "createPetForm",
    validate,
    enableReinitialize: true,
  })
)(PetsCreate);
