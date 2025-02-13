import styled from "styled-components";

export const PanelContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: ${({ $gap }) => $gap ? `${$gap}rem` : "1rem"};
  padding-top: ${({ $paddingTop }) => $paddingTop ? `${$paddingTop}px` : "0px"};
  flex-direction: ${({ $flexDirection }) => $flexDirection || "row"};
`;
