import lockIcon from "../assets/lock-fill.svg";
import manageRoles from "../assets/people-fill.svg";
import addEmployee from "../assets/person-fill-add.svg";
import { AdminAvailableSlotsForm } from "../components/AdminAvailableSlotsForm";
import { ReservedSlotsForm } from "../components/ReservedSlotsForm";
import { PanelContainer } from "../elements/PanelContainer";
import { PanelWithIconAndButton } from "../elements/PanelWithIconAndButton";

export function AdminDashboard() {

  return <>
      <PanelContainer $gap={4} $paddingTop={10}>
        <ReservedSlotsForm />
        <AdminAvailableSlotsForm />
      </PanelContainer>
      <PanelContainer $gap={4} $paddingTop={20}>
        <PanelWithIconAndButton buttonLink={"/admin/addemployee"} width={300} $flexDirection={"column"} iconSrc={addEmployee} iconSize={100} buttonText={"Add Employee"}/>
        <PanelWithIconAndButton buttonLink={"/admin/manageroles"} width={300} $flexDirection={"column"} iconSrc={manageRoles} iconSize={100} buttonText={"Manage Roles"}/>
        <PanelWithIconAndButton buttonLink={"/admin/updatepasswords"} width={300} $flexDirection={"column"} iconSrc={lockIcon} iconSize={100} buttonText={"Update Passwords"}/>
      </PanelContainer>
  </>
}