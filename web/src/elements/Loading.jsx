import styled, { keyframes } from "styled-components";

export function Loading() {

  return <LoadingContainer>
    <Bar />
    <Bar />
    <Bar />
    <Bar />
    <Bar />
  </LoadingContainer>
}

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 4px;
  height: 40px;
`;

const wave = keyframes`
  0%, 100%{
    transform: scaleY(2);
  }
  50% {
    transform: scaleY(1);
  }
`;

const Bar = styled.div`
  height: 50%;
  width: 6px;
  background-color: var(--darkGreen);
  flex-shrink: 0;
  animation: ${wave} 1800ms infinite ease-in-out;
  &:nth-child(1) {
    animation-delay: 0s;
  }
  &:nth-child(2) {
    animation-delay: 300ms;
  }
  &:nth-child(3) {
    animation-delay: 600ms;
  }
  &:nth-child(4) {
    animation-delay: 900ms;
  }
  &:nth-child(5) {
    animation-delay: 1200ms;
  }
`;