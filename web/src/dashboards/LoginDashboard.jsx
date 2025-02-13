import { LoginForm } from "../components/LoginForm";
import { PanelContainer } from "../elements/PanelContainer";

export function LoginDashboard() {

  return <>
      <PanelContainer $gap={4} $paddingTop={10}>
          <LoginForm/>
      </PanelContainer>
  </>
}