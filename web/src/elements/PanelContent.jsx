import styled from "styled-components";

export const PanelContent = styled.div`
  width: ${({width}) => width}px;
  ${({ flexDirection }) => (flexDirection && flexDirection === 'column') && `
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 1rem;
  `}

  & > *:not(img) {
    padding-top: .75rem;
  }
`;