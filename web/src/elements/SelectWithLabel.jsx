import styled from "styled-components";
import { Select } from "./Select";

export function SelectWithLabel({ label1 = '', options = [], ...props }) {
  return (
    <Layout>
      {label1 && <Label htmlFor={`input-${label1}`}>{label1}</Label>}
      <Select id={`input-${label1}`} {...props}>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
      {props.$warn && <p style={{ color: 'red' }}>{props.$warn}</p>}
    </Layout>
  );
}

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 0.25rem;
`;

const Label = styled.label`
  letter-spacing: 1px;
  font-weight: 500;
  font-size: 1.1rem;
`;