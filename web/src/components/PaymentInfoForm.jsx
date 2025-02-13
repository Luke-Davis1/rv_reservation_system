import styled from 'styled-components';
import { InputWithLabel } from '../elements/InputWithLabel';
import { Panel } from '../elements/Panel';
import { TextAreaWithLabel } from '../elements/TextArea';

export function PaymentInfoForm({ paymentInfo, setPaymentInfo, customerInfo, setCustomerInfo }) {

  return <Layout>
    <h2>Payment Info</h2>
    <InputWithLabel label="Name on Card" placeholder="Enter cardholder name" width={"100%"} onChange={(e) => setPaymentInfo(cur => ({ ...cur, cardName: e.target.value }))} value={paymentInfo.cardName} />
    <InputWithLabel label="Card Number" placeholder="Enter card number" width={"100%"} onChange={(e) => setPaymentInfo(cur => ({ ...cur, cardNumber: e.target.value }))} value={paymentInfo.cardNumber} />
    <Row>
      <InputWithLabel label="CVC" placeholder="Enter CVC" width={"100%"} onChange={(e) => setPaymentInfo(cur => ({ ...cur, cvc: e.target.value }))} value={paymentInfo.cvc} />
      <InputWithLabel label="Expiration" placeholder="Enter expiration date" width={"100%"} onChange={(e) => setPaymentInfo(cur => ({ ...cur, expiration: e.target.value }))} value={paymentInfo.expiration} />
    </Row>
    <InputWithLabel label="Contact Phone Number" placeholder="Enter phone number" width={"100%"} onChange={(e) => setCustomerInfo(cur => ({ ...cur, phone: e.target.value }))} value={customerInfo.phone} />
    <TextAreaWithLabel label="Additional Comments" placeholder="Enter additional comments" width={"100%"} onChange={(e) => setPaymentInfo(cur => ({ ...cur, comments: e.target.value }))} value={paymentInfo.comments} />
  </Layout>
}

const Layout = styled(Panel)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
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