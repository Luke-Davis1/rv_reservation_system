import styled from "styled-components";

export const Input = styled.input`
  background-color: #fafafa;
  color: #000;
  border-radius: 0.25rem;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border: ${({ $warn }) => $warn ? '1px solid var(--red)' : '1px solid #E6E6E6'};
  outline: none;
  transition: ease-in-out 0.1s;

  &:hover {
    box-shadow: 0 0 3px 0px var(--lightGreen);
  }

  &:focus{
    box-shadow: 0 0 1px 1px var(--darkGreen);
  }

  &:disabled {
    box-shadow: none;
    background-color: #e2e2e2;
    color: #aaa;
    cursor: not-allowed;
  }

  ::placeholder {
    color: ${({ $warn }) => $warn ? 'var(--red)' : '#aaa'};
  }
`;