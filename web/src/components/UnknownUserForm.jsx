import { ArrowRight } from "@styled-icons/feather/ArrowRight";
import styled from "styled-components";
import { Button } from "../elements/Button";
import { InputWithLabel } from "../elements/InputWithLabel";
import { Panel } from "../elements/Panel";
import { TextAreaWithLabel } from "../elements/TextArea";

export function UnknownUserForm({onSubmit, data, siteInfo, setPaymentInfo, setCustomerInfo, setReservationInfo, reservationInfo, customerInfo, paymentInfo}) {

  return <Layout>
    <h2>Payment Info</h2>
    {data && siteInfo && (
      <Row>
        <span>Selected Slot: #{siteInfo.name}</span>
        <span>Duration of stay: {data.nights} nights</span>
      </Row>
    ) }
    <InputWithLabel label="Name on Card" placeholder="Enter cardholder name" width={"100%"} onChange={(e) => setPaymentInfo(prev => ({ ...prev, cardName: e.target.value }))} />
    <InputWithLabel label="Card Number" placeholder="Enter card number" width={"100%"} onChange={(e) => setPaymentInfo(prev => ({ ...prev, cardNumber: e.target.value }))} />
    <Row>
      <InputWithLabel label="CVC" placeholder="Enter CVC" width={"100%"} onChange={(e) => setPaymentInfo(prev => ({ ...prev, cvc: e.target.value }))} />
      <InputWithLabel label="Expiration" placeholder="Enter expiration date" width={"100%"} onChange={(e) => setPaymentInfo(prev => ({ ...prev, expiration: e.target.value }))} />
    </Row>
    <Row>
      <InputWithLabel label="Customer First Name" placeholder="Enter customer's first name" width={"100%"} onChange={(e) => setCustomerInfo(prev => ({ ...prev, firstName: e.target.value }))} />
      <InputWithLabel label="Customer Last Name" placeholder="Enter customer's last name" width={"100%"} onChange={(e) => setCustomerInfo(prev => ({ ...prev, lastName: e.target.value }))} />
    </Row>
    <InputWithLabel label="Contact Phone Number" placeholder="Enter phone number" width={"100%"} onChange={(e) => setCustomerInfo(prev => ({ ...prev, phone: e.target.value }))} />
    <TextAreaWithLabel label="Customer Comments" placeholder="Enter customer comments" width={"100%"} onChange={(e) => setReservationInfo(prev => ({ ...prev, comments: e.target.value }))} />
    <TextAreaWithLabel label="Reservation Notes" placeholder="Enter reservation notes" width={"100%"} onChange={(e) => setReservationInfo(prev => ({ ...prev, notes: e.target.value }))} />
    {onSubmit && data && (
      <Row>
        <TotalText>Total: ${data.total}</TotalText>
        <Button onClick={onSubmit}>Submit <ArrowRight size={15} strokeWidth={'2px'} /></Button>
      </Row>
    )}
  </Layout>
}

const Layout = styled(Panel)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 800px;
  gap: 1rem;
`;

const Row = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 3rem;

  @media screen and (max-width: 1000px){
    flex-direction: column;
    gap: 1rem; 
  }
`;

const TotalText = styled.span`
  font-weight: bold;
  font-size: 1.5rem;
`;