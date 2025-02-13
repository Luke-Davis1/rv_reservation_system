import styled from "styled-components";

export function Link ({url, children, type="default", onClick}) {
  return <>
    <StyledLink href={url || '#'} type={type} onClick={onClick}>
      {children}
    </StyledLink>
  </>
}

const StyledLink = styled.a`
  cursor: pointer;
  text-decoration: none;
  color: ${({type}) => {
    switch (type) {
      case 'login':
        return 'var(--darkGreen)';
      case 'navigation':
        return 'var(--gray)';
      case 'navigation-selected':
        return 'var(--babyBlue)';
      default:
        return 'black';
    }
  }};

  font-size: ${({type}) => {
    switch (type) {
      case 'login':
        return '0.8rem';
      case 'navigation':
        return '1.2rem';
      case 'navigation-selected':
        return '1.2rem';
      default:
        return '1rem';
    }
  }};

  font-weight: ${({type}) => {
    switch (type) {
      case 'login':
        return '800';
      case 'navigation':
        return '500';
      case 'navigation-selected':
        return '500';
      default:
        return '100';
    }
  }};

  &:hover {
    opacity: 0.7;
  }
`;