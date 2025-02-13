import dayjs from "dayjs";
import { pool } from "../db/index.js";

export async function calculateRefund(req, res) {
  const { reservation_id } = req.query;
  const today = dayjs();
  const futureDate = today.add(3, 'day');

  // get reservation details
  try {
    const getDetailsQuery = `
      SELECT start_date, end_date, s.price_per_night, cost 
      FROM sites s 
      JOIN reservations r ON s.site_id = r.site_id 
      WHERE r.reservation_id = ?;
    `;
    const [result] = await pool.query(getDetailsQuery, [reservation_id]);
    const firstrow = result[0];
    if (firstrow === undefined) return res.status(400).json({ message: "Error getting reservation details to calculate refund" });

    let price_per_night = firstrow.price_per_night;
    let cost = firstrow.cost;
    let start_date = dayjs(firstrow.start_date);
    let end_date = dayjs(firstrow.end_date);
    const dateDiff = today.diff(start_date, 'day');

    // REFUND CALCULATION
    // if end date has passed, no refund
    let refundAmount = 0;
    if (end_date <= today) {
      refundAmount = 0;
    }
    // if start_date >= 3 days from today, and end_date has not passed, then refund = cost - 10.00
    else if (start_date >= futureDate) {
      refundAmount = cost - 10;
    }
    // if start_date < 3 days from today, and start and end dates have not passed, then refund = cost - price_per_night
    else if (start_date < futureDate && start_date >= today) {
      refundAmount = cost - price_per_night;
    }
    // if start date has passed, but end date has not, refund = cost - ((days stayed + 1) * price_per_night)
    else if (start_date < today && end_date > today) {
      refundAmount = cost - ((dateDiff + 1) * price_per_night);
    }
    return res.json({ refundAmount });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Error getting reservation details to calculate refund" });
  }

}


export async function cancelReservation(req, res) {
  const { reservation_id, refund } = req.query;

  // get payment details
  let amount = 0;
  let payment_method = 'unknown';
  try {
    const getDetailsQuery = `SELECT amount, payment_method from payments WHERE reservation_id = ?;`;
    const [result] = await pool.query(getDetailsQuery, [reservation_id]);
    const firstrow = result[0];
    if (firstrow === undefined) {
      return res.status(400).json({ message: "Error getting payment details to process refund" });
    }
    amount = firstrow.amount;
    payment_method = firstrow.payment_method;

  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Error getting payment details to process refund" });
  }

  // update reservation and create payment record of refund
  const updateQuery = `UPDATE reservations SET status = 'Canceled', cost = cost - ? WHERE reservation_id = ?;\
                 INSERT INTO payments (amount, status, reservation_id, payment_method, description, created_at) \
                 VALUES (?, 'Processed', ?, ?, 'refund', now())`;
  let neg_refund = (refund * -1)
  try {
    const [results] = await pool.query(updateQuery, [refund, reservation_id, neg_refund, reservation_id, payment_method]);
    return res.json({ message: `Cancellation of Reservation ${reservation_id} Confirmed` });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error cancelling reservation" });
  }

}