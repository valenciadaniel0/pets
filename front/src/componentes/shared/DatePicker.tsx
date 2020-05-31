import React, { PureComponent } from 'react';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { SingleDatePicker } from 'react-dates';
import moment from 'moment';
import { Field } from 'redux-form';

interface Props{
    input:any,
    meta:any,
    placeholder:string,
    disabled:boolean,
    required:boolean
}

class DatePicker extends PureComponent<Props,any> { 

  state = {
    focused: false,
  };

  onFocusChange = (value:any) => {
    this.setState({ focused: !this.state.focused });
    const { input } = this.props;
    input.onFocus(value);
  };

  render() {
    const {
      input,
      meta: { touched, error},
      placeholder,
      disabled,
    } = this.props;
    const { focused } = this.state;    

    return (
      <React.Fragment>
        <SingleDatePicker
          showClearDate={true}
          showDefaultInputIcon={true}
          displayFormat="YYYY-MM-DD"
          numberOfMonths={1}
          disabled={disabled}
          placeholder={placeholder}
          date={input.value}
          onDateChange={input.onChange}
          focused={focused}
          isOutsideRange={() => false}
          onFocusChange={this.onFocusChange}
          id={input.name}
        />
        {error && touched && <span>{error}</span>}
      </React.Fragment>
    );
  }
}

export const formatDates = (value:any) => (value ? moment(value) : null);

export const normalizeDates = (value:any) =>
  value ? value.format('YYYY-MM-DD') : null;

export const FieldDatePicker = (props:any) => {
  return (
    <Field
      normalize={normalizeDates}
      format={formatDates}
      name={props.name}
      component={DatePicker}
      props={props}
    />
  );
};

export default DatePicker;