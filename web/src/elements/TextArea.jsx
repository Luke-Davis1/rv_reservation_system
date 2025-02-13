import styled from "styled-components";

export function TextAreaWithLabel(props) {
  const { label, width = 'fit-content', containerStyle } = props;

  return <Layout width={width} style={containerStyle}>
    <Label htmlFor={`input-${label}`}>{label}</Label>
    <TextArea {...props} id={`input-${label}`} />
  </Layout>
}


export const TextArea = styled.textarea`
  background-color: #F9F9F9;
  color: #000;
  border-radius: 0.25rem;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border: 1px solid #E6E6E6;
  outline: none;
  transition: ease-in-out 0.1s;

  &:hover {
    box-shadow: inset 0 0 3px 0px var(--lightGreen);
  }

  &:focus{
    box-shadow: inset 0 0 2px 1px var(--darkGreen);
  }

  &:disabled {
    box-shadow: none;
    background-color: #E6E6E6;
  }
`;

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
