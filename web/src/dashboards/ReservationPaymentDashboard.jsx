import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { bookReservation } from "../api/reservations";
import { PaymentCostBreakdownForm } from "../components/PaymentCostBreakdownForm";
import { PaymentInfoForm } from "../components/PaymentInfoForm";
import { UnknownUserForm } from "../components/UnknownUserForm";
import { CancellationNotice } from "../elements/CancellationNotice";

export function ReservationPaymentDashboard() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const location = useLocation();
  const params = useMemo(() => {
    const queryParams = new URLSearchParams(location.search);
    const startDate = queryParams.get('startDate');
    const endDate = queryParams.get('endDate');
    const slotType = queryParams.get('slotType');
    const length = queryParams.get('length');
    const pcs = queryParams.get('pcs');
    const siteId = queryParams.get('siteId');
    return { startDate, endDate, slotType, length, pcs, siteId }
  }, [location.search]);

  const [paymentInfo, setPaymentInfo] = useState({
    cardName: '',
    cardNumber: '',
    cvc: '',
    expiration: '',
    comments: ''
  });

  const [reservationInfo, setReservationInfo] = useState({
    notes: '',
    comments: ''
  });

  const [customerInfo, setCustomerInfo] = useState({
    firstName: '',
    lastName: '',
    phone: '',
  });

  const submitDisabled = useMemo(() => (
    paymentInfo.cardName === '' || paymentInfo.cardNumber === '' || paymentInfo.cvc === '' ||
    paymentInfo.expiration === '' || customerInfo.phone === ''
  ), [paymentInfo, customerInfo]);

  async function onSubmit() {
    const success = await bookReservation({ startDate: params.startDate, endDate: params.endDate, siteId: params.siteId }, paymentInfo, customerInfo);
    if (success) {
      // figure out user type
      let userType = localStorage.getItem("userType");
      if (!userType) {
        // route back to home page
        return navigate("/");
      }
      if (userType === 'customer') {
        return navigate("/reservations");
      } else {
        return navigate("/employee/reservations");
      }
    }
  }

  return <Layout>
    {!token ? (<UnknownUserForm {...{customerInfo, paymentInfo, reservationInfo, setReservationInfo, setPaymentInfo, setCustomerInfo}}/>) : (
      <PaymentInfoForm {...{ paymentInfo, setPaymentInfo, customerInfo, setCustomerInfo }} />
    )}
    <Column>
      <PaymentCostBreakdownForm {...{ ...params, submitDisabled, onSubmit }} />
      <CancellationNotice />
    </Column>
  </Layout>
}

const Layout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  @media screen and (max-width: 1000px) {
    grid-template-columns: 1fr;
  }
`;

const Column = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 3rem;
`;