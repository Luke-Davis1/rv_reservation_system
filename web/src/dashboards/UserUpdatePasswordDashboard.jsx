import { UserUpdatePasswordForm } from "../components/UserUpdatePasswordForm";
import { PanelContainer } from "../elements/PanelContainer";

export function UserUpdatePasswordDashboard() {

  return <>
      <PanelContainer $gap={4} $paddingTop={10}>
          <UserUpdatePasswordForm/>
      </PanelContainer>
  </>
}
