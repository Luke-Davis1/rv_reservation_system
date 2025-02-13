import { CustomerFilterSlotsForm } from "../components/CustomerFilterSlotsForm";
import { PanelContainer } from "../elements/PanelContainer";


export function CustomerFilterSlotsDashboard() {

  return <>   
      <PanelContainer $gap={4} $paddingTop={10}>
          <CustomerFilterSlotsForm/>
      </PanelContainer>
  </>
}