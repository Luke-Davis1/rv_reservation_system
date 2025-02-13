import dayjs from 'dayjs';
import { useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import { bookReservation_Employee } from '../api/reservations';
import { fetchSiteInfo } from '../api/sites';
import { UnknownUserForm } from '../components/UnknownUserForm';
import { Loading } from '../elements/Loading';

export function EmployeeBookReservationDashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useMemo(() => {
    const queryParams = new URLSearchParams(location.search);
    const startDate = queryParams.get('startDate');
    const endDate = queryParams.get('endDate');
    const siteId = queryParams.get('siteId');
    return { startDate, endDate, siteId }
  }, [location.search]);
  const { data: siteInfo, isLoading } = useQuery(['siteInfo', params.siteId], () => fetchSiteInfo(params.siteId));

  const data = useMemo(() => {
    if (siteInfo === undefined) return;
    const nights = dayjs(params.endDate).diff(params.startDate, 'days')
    return { ...siteInfo, total: siteInfo.price_per_night * nights, nights }
  }, [siteInfo]);

  const [reservationInfo, setReservationInfo] = useState({
    notes: '',
    comments: ''
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardName: '',
    cardNumber: '',
    cvc: '',
    expiration: '',
    phone: '',
  });

  const [customerInfo, setCustomerInfo] = useState({
    firstName: '',
    lastName: '',
    phone: '',
  });

  const [successModalOpen, setSuccessModalOpen] = useState(false);

  async function onSubmit() {
    const success = await bookReservation_Employee({ ...reservationInfo, ...params }, paymentInfo, customerInfo);
    if (success) {
      alert("Reservation Created Successfully")
      navigate('/employee')
    }
  }

  if (isLoading) return <Loading />;

  return <UnknownUserForm {...{onSubmit, data, siteInfo, customerInfo, paymentInfo, reservationInfo, setReservationInfo, setPaymentInfo, setCustomerInfo}}/>
}

