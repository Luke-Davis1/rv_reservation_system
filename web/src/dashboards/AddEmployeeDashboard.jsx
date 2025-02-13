import { ArrowRight } from "@styled-icons/feather/ArrowRight";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AddEmployeeForm } from "../components/AddEmployeeForm";
import { Button } from "../elements/Button";
import { PanelContainer } from "../elements/PanelContainer";

export function AddEmployeeDashboard() {
  const navigate = useNavigate();

  return <Layout>
      <PanelContainer $gap={4} $paddingTop={10}>
          <AddEmployeeForm/>
      </PanelContainer>
      <Button onClick={() => navigate("/admin")}>Back to dashboard <ArrowRight size={15} strokeWidth={'2px'} /></Button>
  </ Layout>
}

const Layout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 2rem;
`;