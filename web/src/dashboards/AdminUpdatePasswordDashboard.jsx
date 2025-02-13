import { ArrowRight } from "@styled-icons/feather/ArrowRight";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AdminUpdatePasswordForm } from "../components/AdminUpdatePasswordForm";
import { Button } from "../elements/Button";
import { PanelContainer } from "../elements/PanelContainer";


export function AdminUpdatePasswordDashboard() {
  const navigate = useNavigate();

  return <Layout>
      <PanelContainer $paddingTop={10}>
          <AdminUpdatePasswordForm/>
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