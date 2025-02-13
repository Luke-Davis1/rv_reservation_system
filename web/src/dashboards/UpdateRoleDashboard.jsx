import { UpdateRoleForm } from "../components/UpdateRoleForm";
import { PanelContainer } from "../elements/PanelContainer";

export function UpdateRoleDashboard() {

  return <>
      <PanelContainer $gap={4} $paddingTop={10}>
          <UpdateRoleForm/>
      </PanelContainer>
  </>
}