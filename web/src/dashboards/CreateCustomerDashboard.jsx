import { CreateCustomerForm } from "../components/CreateCustomerForm";
import { PanelContainer } from "../elements/PanelContainer";


export function CreateCustomerDashboard() {

  return <>
      <PanelContainer $gap={4} $paddingTop={10}>
          <CreateCustomerForm/>
      </PanelContainer>
  </>
}