import { ArrowRight } from "@styled-icons/feather/ArrowRight";
import dayjs from "dayjs";
import { useMemo, useState } from "react";
import { useQuery } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { fetchBookedReservations_Employee } from "../api/reservations";
import { Button } from "../elements/Button";
import { Loading } from '../elements/Loading';
import { Table } from "../elements/Table";

export function EmployeeBookedReservationsDashboard() {
  const [reservationId, setReservationId] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const params = useMemo(() => {
    const queryParams = new URLSearchParams(location.search);
    const desiredDate = queryParams.get('desiredDate');
    return { desiredDate };
  }, [location.search]);

  function handleClick(reservationId) {
    setReservationId()
    const params = new URLSearchParams();
    if (reservationId) {
      params.append('reservationId', reservationId);
      navigate(`/employee/reservation/details?${params.toString()}`);
    }
  }

  const { data: bookedReservations, isLoading, isError } = useQuery(['BookedReservationsEmployee', params], () => fetchBookedReservations_Employee(params));

  const columns = useMemo(() => ([
    { name: 'Slot #', dataIndex: 'site_name' },
    { name: 'Customer Name', dataIndex: 'customer_name' },
    { name: 'Phone Number', dataIndex: 'phone' },
    { name: 'Start Date', dataIndex: 'start_date', render: (value) => <>{dayjs(value).format('MMM DD, YYYY')}</> },
    { name: 'End Date', dataIndex: 'end_date', render: (value) => <>{dayjs(value).format('MMM DD, YYYY')}</> },
    { name: 'Customer Comments', dataIndex: 'customer_comments' },
    { name: 'Details', dataIndex: 'reservation_id', render: (reservationId) => (<Button onClick={() => handleClick(reservationId)} size="small">View <ArrowRight size={15} strokeWidth="2px" /></Button>) },
  ]), []);

  if (isLoading) return <Loading />;
  if (isError) return <>An error occured. Please refresh.</>

  return <Layout>
    <Table columns={columns} data={bookedReservations.data} width={"100%"} />
  </Layout>
}

const Layout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;