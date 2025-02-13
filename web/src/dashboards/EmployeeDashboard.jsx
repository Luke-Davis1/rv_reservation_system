import { AdminAvailableSlotsForm } from "../components/AdminAvailableSlotsForm";
import { ReservedSlotsForm } from "../components/ReservedSlotsForm";
import { PanelContainer } from "../elements/PanelContainer";

export function EmployeeDashboard() {

  return <>
      <PanelContainer $gap={4} $paddingTop={10}>
        <ReservedSlotsForm/>
      </PanelContainer>
      <PanelContainer $gap={4} $paddingTop={10}>
        <AdminAvailableSlotsForm/>
      </PanelContainer>
  </>
}