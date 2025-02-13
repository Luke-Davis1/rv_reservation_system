import { AlertTriangle } from '@styled-icons/feather/AlertTriangle';
import styled from "styled-components";

export function CancellationNotice() {
  return <WarningBox>
    <AlertTriangle size={30} strokeWidth={'2px'} />
    <div >
      <p>Cancellations made at least 3 days before arrival will be charged a $10 fee</p>
      <p>Cancellations made less than  3 days before arrival will be charged a full day</p>
      <p>Cancellations for holidays or special events will be charged a full day</p>
    </div>
  </WarningBox>
}

const WarningBox = styled.div`
  background-color: var(--peach);
  color: var(--orange);
  border: 1px solid var(--orange);
  padding: 0.75rem;
  font-weight: 600;

  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 1rem;
`;