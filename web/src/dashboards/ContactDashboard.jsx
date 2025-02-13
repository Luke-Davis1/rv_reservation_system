import { Panel } from "../elements/Panel";
import { PanelContent } from "../elements/PanelContent";

export function ContactDashboard() {

  return <Panel>
    <PanelContent width={500}>
      <h3>Hours of Availability</h3>
      <p>9-5 PM, M-F</p>
      <p>Office closed Saturday and Sunday</p>
      <h3>Phone Number</h3>
      <p>123-456-7890</p>
      <h3>Email</h3>
      <p>support@famcamp.org</p>
    </PanelContent>
  </Panel>
}