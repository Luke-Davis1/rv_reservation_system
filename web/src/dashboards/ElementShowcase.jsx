import styled from "styled-components";
import { Button } from "../elements/Button";
import { CustomDatePicker } from "../elements/DatePicker";
import { InputWithLabel } from "../elements/InputWithLabel";
import { Loading } from "../elements/Loading";
import { Panel } from "../elements/Panel";

export function ElementShowcase() {

  return <Layout>
    <Panel>I am a panel</Panel>
    <Panel style={{ width: '30%' }}>I am a panel that has been sized</Panel>
    <Button>Book a reservation</Button>
    <Button disabled>Disabled Button</Button>
    <InputWithLabel label="First Name" />
    <CustomDatePicker />
    <Loading />
  </Layout>
}

const Layout = styled.div`
  &>* {
    margin: 1rem 0;
  }
`;