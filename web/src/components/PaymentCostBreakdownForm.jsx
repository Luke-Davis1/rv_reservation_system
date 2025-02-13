import { ArrowRight } from "@styled-icons/feather/ArrowRight";
import dayjs from "dayjs";
import { useMemo } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { fetchSiteInfo } from "../api/sites";
import { Button } from "../elements/Button";
import { Loading } from "../elements/Loading";
import { Panel } from "../elements/Panel";
import { Table } from "../elements/Table";

export function PaymentCostBreakdownForm({ siteId, startDate, endDate, submitDisabled, onSubmit }) {
  const { data: siteInfo, isLoading } = useQuery(['siteInfo', siteId], () => fetchSiteInfo(siteId));

  const columns = useMemo(() => ([
    { name: 'Slot #', dataIndex: 'name' },
    { name: 'Price Per Night', dataIndex: 'price_per_night', render: (value) => <>${value}</> },
    { name: 'Total Nights of Stay', dataIndex: 'nights', render: (value) => <>{value} nights</> },
    { name: 'Amount', dataIndex: 'total', render: (value) => <>${value}</> },
  ]), []);

  const data = useMemo(() => {
    if (siteInfo === undefined) return;
    const nights = dayjs(endDate).diff(startDate, 'days')
    return { ...siteInfo, total: siteInfo.price_per_night * nights, nights }
  }, [siteInfo]);

  return <Layout>
    <h3>Cost Breakdown</h3>
    {isLoading || data === undefined ? <Loading /> : <Table columns={columns} data={[data]} width={"100%"} />}
    <Row>
      {isLoading || data === undefined ? <Loading /> : <Total>Total: ${data.total}</Total>}
      <Button disabled={submitDisabled} onClick={onSubmit}>Submit <ArrowRight size={15} strokeWidth="2px" /></Button>
    </Row>
  </Layout>
}

const Layout = styled(Panel)`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

const Total = styled.span`
  font-weight: bold;
  font-size: 1.5rem;
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