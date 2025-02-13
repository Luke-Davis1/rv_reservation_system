import dayjs from "dayjs";
import { get, post } from "./helpers";

export async function fetchAvailableSlots_Employee(params) {
  const queryParams = new URLSearchParams();
  const startDateString = dayjs(params.startDate).format('YYYY-MM-DD');
  const endDateString = dayjs(params.endDate).format('YYYY-MM-DD');
  if (startDateString) queryParams.append('startDate', startDateString);
  if (endDateString) queryParams.append('endDate', endDateString);
  // Make the request to get the reservations
  const { data: availableSlots } = await get(`/reservations/employee/available?${queryParams.toString()}`);
  return availableSlots;
}

export async function fetchBookedReservations_Employee(params) {
  if (!params.desiredDate) throw Error("Missing Date");

  const queryParams = new URLSearchParams();
  const desiredDateString = dayjs(params.desiredDate).format('YYYY-MM-DD');
  if (desiredDateString) queryParams.append('desiredDate', desiredDateString);
  // Make the request to get the reservations
  const response = await get(`/reservations/employee/reserved?${queryParams.toString()}`);
  return response;
}

export async function fetchAvailableReservations(params) {
  const queryParams = new URLSearchParams();
  const startDateString = dayjs(params.startDate).format('YYYY-MM-DD');
  const endDateString = dayjs(params.endDate).format('YYYY-MM-DD');
  if (startDateString) queryParams.append('startDate', startDateString);
  if (endDateString) queryParams.append('endDate', endDateString);
  if (params.siteType) queryParams.append('siteType', params.siteType);
  if (params.siteType === '1' && params.length) queryParams.append('length', params.length);
  if (params.onPCS) queryParams.append('onPCS', params.onPCS);
  let response = undefined;
  if (localStorage.getItem("token")) {
    response = await get(`/reservations/available?${queryParams.toString()}`);
  } else {
    response = await get(`/unauthenticated/reservations/available?${queryParams.toString()}`);
  }
  return response;
}

export async function bookReservation(reservationDetails, paymentDetails, customerDetails) {
  let response = undefined;
  if (localStorage.getItem("token")) {
    response = await post('/reservations/book', { reservationDetails, paymentDetails, customerDetails });
  } else {
    response = await post('/unauthenticated/reservations/book', { reservationDetails, paymentDetails, customerDetails });
  }
  return response.status === 200;
}
export async function bookReservation_Employee(reservationDetails, paymentDetails, customerDetails) {
  const response = await post('/reservations/employee/book', { reservationDetails, paymentDetails, customerDetails });
  return response.status === 200;
}

export async function fetchCustomerReservations() {
  const response = await get('/reservations/view');
  return response;
}

export async function calculateRefund(reservation_id) {
  const queryParams = new URLSearchParams();
  if (reservation_id) queryParams.append('reservation_id', reservation_id);
  const { data: refund } = await get(`/reservations/refund?${queryParams.toString()}`);
  return refund.refundAmount;
}

export async function cancelReservation(reservation_id, refund) {
  const queryParams = new URLSearchParams();
  if (reservation_id) queryParams.append('reservation_id', reservation_id);
  if (refund !== null && refund !== undefined) queryParams.append('refund', refund);
  // Cancel the reservation
  const message = await post(`/reservations/cancel?${queryParams.toString()}`);
  return message;
}

export async function fetchReservationDetails(params) {
  const queryParams = new URLSearchParams();
  const reservationId = params.reservationId;
  if (params.reservationId) queryParams.append('reservationId', params.reservationId);
  const { data: reservationData } = await get(`/reservations/employee/reserved/details?${queryParams.toString()}`);
  return reservationData;
}