import { ArrowRight } from "@styled-icons/feather/ArrowRight";
import dayjs from 'dayjs';
import { useMemo, useState } from "react";
import { useQuery } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { calculateRefund, fetchReservationDetails } from "../api/reservations";
import { CancelReservationModal } from "../components/CancelReservationModal";
import { Button } from "../elements/Button";
import { InputWithLabel } from "../elements/InputWithLabel";
import { Loading } from "../elements/Loading";
import { Panel } from "../elements/Panel";
import { TextAreaWithLabel } from "../elements/TextArea";


export function EmployeeBookedReservationDetailsDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useMemo(() => {
    const queryParams = new URLSearchParams(location.search);
    const reservationId = queryParams.get('reservationId');
    return { reservationId, urlParams: queryParams }
  }, [location.search]);
  const [cancelOpen, setCancelOpen] = useState(false);
  const [refundAmount, setRefundAmount] = useState(0);

  const { data: reservationData, isLoading } = useQuery(['reservation-details', params],
    () => fetchReservationDetails(params)
  );
  
  if (isLoading) return <Loading />;

  const handleCancelRequest = (reservationId) => {
    const calculatedRefund = calculateRefund(reservationId);
    setRefundAmount(calculatedRefund);
    setCancelOpen(true);
  };

  const handleBackClick = () => {
    const userType = localStorage.getItem("userType");
    if (userType === 'employee'){
      navigate("/employee");
    }
    if (userType === 'admin'){
      navigate("/admin");
    }
  };

  if (isLoading) return <Loading />;

  return <>
    <Layout>
      <h2>Slot Details</h2>
      <DetailContainer>
        <InputWithLabel label="Slot Number" value={reservationData.site_name} readOnly />
        <InputWithLabel label="Slot Type" value={reservationData.type} readOnly />
        <InputWithLabel label="Slot Size" value={reservationData.size} readOnly />
        <InputWithLabel label="Cost Per Night" value={reservationData.price_per_night} readOnly />
        <InputWithLabel label="Start Date" value={dayjs(reservationData.start_date).format('MMM DD, YYYY')} readOnly />
        <InputWithLabel label="End Date" value={dayjs(reservationData.end_date).format('MMM DD, YYYY')} readOnly />
        <InputWithLabel label="Total Payment" value={reservationData.total_payment} readOnly />
      </DetailContainer>
      <h2>Customer Details</h2>
      <CustomerDetailsContainer>
        <InputWithLabel label="Customer Name" value={reservationData.first_name + " " + reservationData.last_name} readOnly />
        <InputWithLabel label="Phone Number" value={reservationData.phone} readOnly />
        <div style={{ gridColumn: 'span 2' }}>
          <TextAreaWithLabel label="Customer Comments" width={'100%'} value={reservationData.customer_comments} readOnly />
        </div>
        <div style={{ gridColumn: '1 / -1' }}>
          <TextAreaWithLabel label="Reservation Notes" width={'100%'} value={reservationData.notes} readOnly />
        </div>
      </CustomerDetailsContainer>
      <Button onClick={handleBackClick} style={{ float: 'left' }}>Back to dashboard <ArrowRight size={15} strokeWidth={'2px'} /></Button>
      <Button 
        onClick={() => handleCancelRequest(reservationData.reservationId)} 
        style={{ float: 'right' }}
        disabled={reservationData.status !== 'Booked'}
      >
        Cancel <ArrowRight size={15} strokeWidth={'2px'} />
      </Button>
    </Layout>
    <CancelReservationModal open={cancelOpen} onCancel={() => setCancelOpen(false)} reservationId={params.reservationId} refundAmount={refundAmount} />
  </>
}

const Layout = styled(Panel)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`

const DetailContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 1rem;

  @media screen and (max-width: 1000px) {
    grid-template-columns: 1fr;
  }
`;

const CustomerDetailsContainer = styled(DetailContainer)`
  @media screen and (max-width: 1000px) {
    grid-template-columns: 1fr;
  }
`;