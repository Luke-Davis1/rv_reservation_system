import { ArrowRight } from "@styled-icons/feather/ArrowRight";
import { useMemo } from "react";
import { useQuery } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { fetchAvailableSlots_Employee } from "../api/reservations";
import { Button } from "../elements/Button";
import { Table } from "../elements/Table";

export function AvailableReservationsDashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useMemo(() => {
    const queryParams = new URLSearchParams(location.search);
    const startDate = queryParams.get('startDate');
    const endDate = queryParams.get('endDate');
    return { startDate, endDate }
  }, [location.search]);

  const { data: availableSlots } = useQuery(['AvailableReservationsEmployee', params], () => fetchAvailableSlots_Employee(params));

  function onReserve(siteId) {
    const queryParams = new URLSearchParams();
    queryParams.set('startDate', params.startDate);
    queryParams.set('endDate', params.endDate);
    queryParams.set('siteId', siteId);
    navigate(`/employee/reservations/book?${queryParams.toString()}`)
  }

  const columns = useMemo(() => ([
    { name: '#', dataIndex: 'name' },
    { name: 'Size (ft)', dataIndex: 'size' },
    { name: 'Type', dataIndex: 'site_type_name', render: (value) => <>{value}</> },
    { name: 'Cost per night', dataIndex: 'price_per_night', render: (value) => <>${value}</> },
    { name: 'Book?', dataIndex: 'site_id', render: (value) => <Button size="small" onClick={() => onReserve(value)}>Reserve <ArrowRight size={15} strokeWidth={'2px'} /></Button> },
  ]), []);

  return <Layout>
    <Table columns={columns} data={availableSlots} />
  </Layout>
}

const Layout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;