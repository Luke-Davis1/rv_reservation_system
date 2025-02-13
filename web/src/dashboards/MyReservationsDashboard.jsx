import { ArrowRight } from '@styled-icons/feather/ArrowRight';
import dayjs from 'dayjs';
import { useMemo, useState } from "react";
import { useQuery } from 'react-query';
import styled from "styled-components";
import { calculateRefund, fetchCustomerReservations } from '../api/reservations';
import { CancelReservationModal } from '../components/CancelReservationModal';
import { Button } from "../elements/Button";
import { Loading } from '../elements/Loading';
import { Table } from "../elements/Table";

export function MyReservationsDashboard() {
  const [cancelOpen, setCancelOpen] = useState(false);
  const [cancelReservationId, setCancelReservationId] = useState(null);
  const { data: reservations, isLoading } = useQuery(['user-reservations'], () => fetchCustomerReservations());
  const [refundAmount, setRefundAmount] = useState(0);
 
  const handleCancelRequest = (reservationId) => {
    const calculatedRefund = calculateRefund(reservationId); 
    setCancelReservationId(reservationId);
    setRefundAmount(calculatedRefund);
    setCancelOpen(true);
  }

  const columns = useMemo(() => ([
    { name: '#', dataIndex: 'site_name' },
    { name: 'Size (ft.)', dataIndex: 'size' },
    { name: 'Type', dataIndex: 'site_type_name' },
    { name: 'Start Date', dataIndex: 'start_date', render: (value) => <>{dayjs(value).format('MMM DD, YYYY')}</> },
    { name: 'End Date', dataIndex: 'end_date', render: (value) => <>{dayjs(value).format('MMM DD, YYYY')}</> },
    { name: 'Status', dataIndex: 'status', render: (value) => <span style={{ color: value === 'Booked' ? 'var(--limeGreen)' : 'red' }}>{value}</span> },
    { 
      name: 'Cancel?', 
      dataIndex: 'reservation_id', 
      render: (reservationId, record) => {
        const isCancelled = record.status === 'Canceled';
        return (
          <Button 
            size="small" 
            onClick={() => handleCancelRequest(reservationId)} 
            disabled={isCancelled}
          >
            Cancel <ArrowRight size={15} strokeWidth={'2px'} />
          </Button>
        );
      }
    },
  ]), []);

  if (isLoading) return <Loading />;

  return <>
    <Layout>
      <Table columns={columns} data={reservations.data} width={"100%"} />
      <a href='customer/filterSlots'><Button>Book a reservation <ArrowRight size={15} strokeWidth={'2px'} /></Button></a>
    </Layout>
    <CancelReservationModal open={cancelOpen} onCancel={() => setCancelOpen(false)} reservationId={cancelReservationId} refundAmount={refundAmount} />
  </>
}

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;