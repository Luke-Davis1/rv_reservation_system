import { ArrowRight } from "@styled-icons/feather/ArrowRight";
import dayjs from "dayjs";
import { useEffect, useMemo } from "react";
import { useQuery } from 'react-query';
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { fetchAvailableReservations } from "../api/reservations";
import { Button } from "../elements/Button";
import { Loading } from "../elements/Loading";
import { Table } from '../elements/Table';

export function BookReservationDashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useMemo(() => {
    const queryParams = new URLSearchParams(location.search);
    const startDate = queryParams.get('startDate');
    const endDate = queryParams.get('endDate');
    const siteType = queryParams.get('siteType');
    const length = queryParams.get('length');
    const pcs = queryParams.get('pcs');
    return { startDate, endDate, siteType, length, pcs, urlParams: queryParams }
  }, [location.search]);

  useEffect(function redirectOnBadParams() {
    if (!params.startDate || !params.endDate || !params.siteType) {
      navigate('/customer/filterSlots');
    }
  }, [params])

  function handleBookClick(siteId) {
    params.urlParams.set("siteId", siteId)
    navigate(`/book/payment?${params.urlParams.toString()}`);
  }

  const { data: availableSlots, isLoading } = useQuery(['AvailableSlots', params], () => fetchAvailableReservations(params));

  const columns = useMemo(() => ([
    { name: '#', dataIndex: 'site_name' },
    { name: 'Size (ft)', dataIndex: 'size', render: (value) => <>{value === 0 ? '-' : value}</> },
    { name: 'Type', dataIndex: 'site_type_name' },
    { name: 'Cost per night', dataIndex: 'price_per_night', render: (value) => <>${value}</> },
    { name: 'Book?', dataIndex: 'site_id', render: (value) => <Button size="small" onClick={() => handleBookClick(value)}>Reserve <ArrowRight size={15} strokeWidth={'2px'} /></Button> },
  ]), []);

  if (isLoading) return <Loading />;

  return <Layout>
    <Column>
      <h3>Available Slots</h3>
      <h4>{dayjs(params.startDate).format('MMM DD, YYYY')} - {dayjs(params.endDate).format('MMM DD, YYYY')}</h4>
      {availableSlots.status === 200 ? <Table columns={columns} data={availableSlots.data} width={"100%"} scroll={'400px'} /> : <></>}
    </Column>
    <Column>
      <img src="Map_tent_site_added.png" width="100%" />
    </Column>
  </Layout>
}

const Layout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;

  @media screen and (max-width: 1000px) {
    grid-template-columns: 1fr;
    
    div:nth-child(1) {
      order: 2;
    }
    div:nth-child(2) {
      order: 1;
    }
  }
`

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 0.5rem;
`