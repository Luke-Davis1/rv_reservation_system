import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styled from "styled-components";
import { Input } from "./Input";

export function CustomDatePicker({ onChange, value, placeholder, minDate, maxDate, disabled }) {
  return <Container>
    <DatePicker
      selected={value}
      customInput={<Input />}
      dateFormat="MMM d, YYYY"
      onChange={onChange}
      placeholderText={placeholder}
      minDate={minDate}
      maxDate={maxDate}
      disabled={disabled}
    />
  </Container>
}

const Container = styled.div`
  .react-datepicker__day--selected {
    background-color: var(--darkGreen);
  }

  .react-datepicker__day:hover {
    background-color: var(--lightGreen);
  }
`