import styled from "styled-components";

export function ButtonList ({children}) {
  return <>
    <ButtonListWrapper>
      {children}
    </ButtonListWrapper>
  </>
}

const ButtonListWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 3rem;
  align-items: center;
`
