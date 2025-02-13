import styled from "styled-components";

export function Icon({iconSrc, size=100}) {

  return <IconWrapper src={iconSrc} size={size}/>
}

const IconWrapper = styled.img`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;

  @media (min-width: 2000px) {
    font-size: 1.2rem; /* Smaller font size for smaller screens */
    width: ${({ size }) => 1.5*size}px;
    height: ${({ size }) => 1.5*size}px;
  }  
  object-fit: cover;
`;
