import { ArrowRight } from "@styled-icons/feather/ArrowRight";
import { Minus } from "@styled-icons/feather/Minus";
import dayjs from "dayjs";
import { useMemo, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { fetchSiteTypes } from "../api/sites";
import { Button } from "../elements/Button";
import { CustomDatePicker } from "../elements/DatePicker";
import { InputWithLabel } from "../elements/InputWithLabel";
import { Loading } from "../elements/Loading";
import { Panel } from "../elements/Panel";
import { SelectWithLabel } from "../elements/SelectWithLabel";


export function CustomerFilterSlotsForm() {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [siteType, setSiteType] = useState(1);
  const [length, setLength] = useState(0);
  const [onPCS, setOnPCS] = useState(false);
  const navigate = useNavigate();
  const buttonDisabled = useMemo(() => !startDate || !endDate || (siteType === 'personalRV' && length <= 0), [startDate, endDate, siteType, length])
  const { data: siteTypes, isLoading } = useQuery(['siteTypes'], fetchSiteTypes);

  const options = useMemo(() => {
    if (siteTypes === undefined) return [];
    return siteTypes.map(type => ({ value: type.site_type_id, label: type.name }))
  }, [siteTypes])

  function handleClick() {
    const params = new URLSearchParams();
    const startDateString = dayjs(startDate).format('YYYY-MM-DD');
    const endDateString = dayjs(endDate).format('YYYY-MM-DD');
    if (startDateString) params.append('startDate', startDateString);
    if (endDateString) params.append('endDate', endDateString);
    if (siteType) params.append('siteType', siteType);
    if (siteType === 1 && length) params.append('length', length);
    if (onPCS) params.append('onPCS', onPCS);

    navigate(`/book?${params.toString()}`);
  }

  const maxStartDate = useMemo(() => {
    const sixMonthsFromNow = dayjs().add(6, 'month');
    return endDate === undefined || dayjs(sixMonthsFromNow).isBefore(endDate) ? sixMonthsFromNow.format('YYYY-MM-DD') : endDate;
  }, [endDate]);

  const maxEndDate = useMemo(() => {
    if (startDate === undefined) return;

    // If the startdate is within 14 days of october 1st, the customer can stay until april 1st
    const startDateDayjs = dayjs(startDate);
    if (startDateDayjs.add(14, 'days').isAfter(`${startDateDayjs.year()}-10-15`)) return `${startDateDayjs.year() + 1}-04-01`

    // Otherwise the end date is 14 days after the start date
    const fourteenDaysAfterStartDate = dayjs(startDate).add(14, 'days');
    return dayjs(fourteenDaysAfterStartDate).isAfter(startDate) ? fourteenDaysAfterStartDate.format('YYYY-MM-DD') : startDate;
  }, [startDate]);

  if (isLoading) return <Loading />;

  return <Layout>
    <InputWithLabel type={"checkbox"} label={"On PCS orders"} onChange={() => setOnPCS(prev => !prev)} value={onPCS} />
    <div>
      <p style={{ fontSize: '1.1rem', letterSpacing: '1px', fontWeight: '500' }}>Desired Dates</p>
      <Row>
        <CustomDatePicker placeholder="Enter start date" value={startDate} onChange={setStartDate} minDate={Date.now()} maxDate={maxStartDate} />
        <Minus size={20} strokeWidth="2px" style={{ marginTop: '0.5rem', alignSelf: 'center' }} />
        <CustomDatePicker placeholder={"Enter end date"} label={" "} onChange={setEndDate} value={endDate} minDate={startDate} maxDate={maxEndDate} disabled={startDate === undefined} />
      </Row>
    </div>
    <Row>
      <SelectWithLabel placeholder={"Select Site Type"} label1={"Site Type"} options={options} onChange={(e) => setSiteType(e.target.value)} value={siteType} />
    </Row>
    <Row>
      <InputWithLabel
        width={'100%'}
        placeholder="Enter length (ft)"
        label="RV/Motorhome Length (ft)"
        onChange={(e) => setLength(e.target.value)}
        value={length}
        type="number"
        $warn={siteType === 1 && length <= 0}
        disabled={siteType !== 1}
      />
    </Row>
    <Button
      style={{ display: 'block', marginTop: '1rem', marginLeft: 'auto', marginRight: 'auto' }}
      disabled={buttonDisabled}
      onClick={handleClick}
    >
      View Available Slots
      <ArrowRight size={15} strokeWidth="2px" />
    </Button>
  </Layout>
}

function getOctoberFifteenth(startDate) {
  const now = dayjs(startDate);
  const thisYearOctober15 = dayjs(`${now.year()}-10-15`);

  // Check if October 15th has already passed this year
  if (now.isAfter(thisYearOctober15)) {
    return thisYearOctober15.add(1, 'year');
  }

  return thisYearOctober15;
}


const Layout = styled(Panel)`
    width: 100%;
    gap: 1rem;

    &>* {
      margin-top: 1rem;
    }
`;

const Row = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;

  @media screen and (max-width: 1000px){
    flex-direction: column;
    gap: 1rem; 
  }
`;