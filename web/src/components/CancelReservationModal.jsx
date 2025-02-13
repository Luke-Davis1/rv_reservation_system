import { ArrowRight } from "@styled-icons/feather/ArrowRight";
import { useQuery } from "react-query";
import styled from "styled-components";
import { calculateRefund, cancelReservation } from "../api/reservations";
import { Button } from "../elements/Button";
import { CancellationNotice } from '../elements/CancellationNotice';
import { Modal } from "../elements/Modal";

export function CancelReservationModal({ open, onCancel, onConfirm, reservationId }) {
  // call refund (usequery - fetch data to show in UI)
  const { data: refundAmount } = useQuery(["refundAmount", reservationId], () => calculateRefund(reservationId));
  const handleCancel = async () => {
    try {
      // Call the cancellation API
      const message = await cancelReservation(reservationId, refundAmount);
      
      if (message) {
        // Close the modal
        onCancel();
        // Reload the page after successful cancellation
        window.location.reload();
      }
    } catch (error) {
      console.error("Error canceling reservation:", error);
    }
  };

  return <Modal open={open} onClose={onCancel}>
    <Layout>
      <h2>Cancellation Confirmation</h2>
      <p>Refund Amount: ${refundAmount}</p>
      <CancellationNotice />
      <Button onClick={handleCancel}>Confirm Cancellation <ArrowRight size={15} strokeWidth={'2px'} /></Button>
    </Layout>
  </Modal>
}

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;