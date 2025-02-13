import styled from "styled-components";
import { Input } from "./Input";

export function InputWithLabel(props) {
  const { label, width = "fit-content", $warn } = props;

  return <Layout width={width}>
    <Label htmlFor={`input-${label}`}>{label}</Label>
    <Input {...props} id={`input-${label}`} />
    {$warn && <p style={{ color: 'red' }}>{$warn}</p>}
  </Layout>
}

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  width: ${({ width }) => width};
  gap: 0.25rem;
`;

const Label = styled.label`
  letter-spacing: 1px;
  font-weight: 500;
  font-size: 1.1rem;
`;
