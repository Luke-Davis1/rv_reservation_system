import { ProfileInfoDisplayForm } from "../components/ProfileInfoDisplayForm";
import { PanelContainer } from "../elements/PanelContainer";

export function ProfileInfoDashboard() {

  return <>
      <PanelContainer $gap={4} $paddingTop={10}>
          <ProfileInfoDisplayForm/>
      </PanelContainer>
  </>
}