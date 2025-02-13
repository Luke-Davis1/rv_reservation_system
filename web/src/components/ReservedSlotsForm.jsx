import { ArrowRight } from "@styled-icons/feather/ArrowRight";
import dayjs from "dayjs";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import { Button } from "../elements/Button";
import { CustomDatePicker } from "../elements/DatePicker";
import { Panel } from "../elements/Panel";
import { PanelContent } from "../elements/PanelContent";

export function ReservedSlotsForm() {
  const [date, setDate] = useState();
  const navigate = useNavigate();

  const handleClick = async (e) => {
    const params = new URLSearchParams();
    const desiredDate = dayjs(date).format('YYYY-MM-DD');
    if (desiredDate) {
      params.append('desiredDate', desiredDate);
      // Add date to params and send to correct page
      navigate(`/employee/reservations?${params.toString()}`);
    }
  }

  return <Panel>
    <PanelContent width={600}>
      <h3>Reserved Slots</h3>
      <CustomDatePicker placeholder="Enter date to search reservations" value={date} onChange={setDate} maxDate={new Date(new Date().setMonth(new Date().getMonth() + 6))} minDate={Date.now()} />
      <ButtonContainer>
        <Button onClick={handleClick}>View Reservations <ArrowRight size={15} strokeWidth={'2px'} /></Button>
      </ButtonContainer>
    </PanelContent>
  </Panel>
}

const ButtonContainer = styled.div`
display: flex;
justify-content: end;
`