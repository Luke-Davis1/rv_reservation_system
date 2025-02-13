import styled from "styled-components";

export function Footer() {

  return <>
    <FooterWrapper>
      <FooterText>
        At Fam Camp, out goal is to simplify reservation services for military personnel and their families, ensuring memorable experiences and easy access to recreational opportunities.
      </FooterText>
    </FooterWrapper>
  </>
}


const FooterWrapper = styled.div`
  margin-top: 2rem;
  position: relative;
  width: 100%;   
  background-color: var(--darkGreen); 
  color: white; 
  display: flex;
  align-items: center; 
  justify-content: center;
`;

const FooterText = styled.div`
  font-weight: 600;
  max-width: 75%;   
  line-height: 1.5;
  padding: 2rem;
  font-size: 2rem;
  text-align: center;
  
  /* Responsive adjustments */
  @media (max-width: 1800px) {
    font-size: 1.2rem; 
  }
`;