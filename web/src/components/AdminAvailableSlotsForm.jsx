import { ArrowRight } from "@styled-icons/feather/ArrowRight";
import { Minus } from "@styled-icons/feather/Minus";
import dayjs from "dayjs";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../elements/Button";
import { CustomDatePicker } from "../elements/DatePicker";
import { Panel } from "../elements/Panel";
import { PanelContent } from "../elements/PanelContent";

export function AdminAvailableSlotsForm() {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  function handleClick() {
    const params = new URLSearchParams();
    const startDateString = dayjs(startDate).format('YYYY-MM-DD');
    const endDateString = dayjs(endDate).format('YYYY-MM-DD');
    if (startDateString) params.append('startDate', startDateString);
    if (endDateString) params.append('endDate', endDateString);

    navigate(`/employee/reservations/available?${params.toString()}`);
  }

  return <Panel>
    <PanelContent width={600}>
      <h3>Available Slots</h3>
      <InputContainer>
        <CustomDatePicker placeholder="Enter start date" value={startDate} onChange={setStartDate} maxDate={endDate} minDate={Date.now()} />
        <Minus size={20} strokeWidth="2px" style={{ marginTop: '0.5rem', alignSelf: 'center' }} />
        <CustomDatePicker placeholder={"Enter end date"} label={" "} onChange={setEndDate} value={endDate} minDate={startDate || Date.now()} />
      </InputContainer>
      <ButtonContainer>
        <Button onClick={handleClick}>View Availability <ArrowRight size={15} strokeWidth={'2px'} /></Button>
      </ButtonContainer>
    </PanelContent>
  </Panel>
}

const InputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  padding-top: 1rem;
`;

const ButtonContainer = styled.div`
display: flex;
justify-content: end;
`;