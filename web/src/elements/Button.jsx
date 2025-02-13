import styled from 'styled-components';


export const Button = styled.button`
  ${props => props.size !== undefined && props.size === 'small' ?
    `padding: 0.3rem 1.1rem;
      font-size: 0.8rem;`
    : `padding: 0.65rem 1.1rem;
      font-size: 1rem;`
  }
  border: none;
  border-radius: 0.25rem;
  font-weight: 600;
  color: #fff;
  background-color: var(--darkGreen);
  cursor: pointer;
  transition: ease -in 0.1s;

  &:hover {
    transform: scale(1.01);
  }

  &:active {
    transform: scale(1);
  }

  &:disabled {
  background-color: #aaa;
  cursor: default ;
  transform: scale(1);
}
`;