import { pool } from '../db/index.js';
import { getAvailableSites, getReservationCost, getUserCustomerId } from '../db/procedures.js';

export async function bookReservation(req, res) {
  const { reservationDetails, paymentDetails, customerDetails } = req.body;
  if (reservationDetails === undefined || paymentDetails === undefined) return res.status(400).json({ success: false, message: 'Missing payment info or reservation details' });
  // if (req.user === undefined) return res.status(400).json({ message: "unknown user" });
  
  const { siteId, endDate, startDate, comments, notes } = reservationDetails;

  const availableSites = await getAvailableSites(startDate, endDate);
  if (availableSites.findIndex(site => site.site_id === Number(siteId)) === -1) return res.status(400).json({ message: "Site is not available" });

  const connection = await pool.getConnection();
  try {
    const reservationCost = await getReservationCost(siteId, startDate, endDate);

    await connection.beginTransaction();
    let customer_id = undefined;
    if (req.user !== undefined) {
      const { user_id } = req.user;
      customer_id = await getUserCustomerId(user_id);
    }

    if (!customer_id) {
      // need to make a new customer
        const customerQuery = `
        insert into customers (first_name, last_name, phone)
        values (?,?,?)
      `;

      const [customerResult] = await connection.query(customerQuery, [customerDetails.firstName, customerDetails.lastName, customerDetails.phone]);
      customer_id = customerResult.insertId;
      if (customer_id === undefined) throw Error("An issue occurred adding a new customer");
    }

    const reservationsQuery = `
      insert into reservations
      (customer_id, site_id, end_date, start_date, cost, customer_comments, status)
      values (?,?,?,?,?,?, 'Booked')
    `;
    const [result] = await connection.query(reservationsQuery, [customer_id, siteId, endDate, startDate, reservationCost, comments]);
    const reservation_id = result.insertId;
    if (reservation_id === undefined) throw new Error("An error occurred while inserting the reservation");

    const paymentsQuery = `
      insert into payments
      (amount, status, reservation_id, payment_method)
      values
      (?, 'Processed', ?, 'Credit Card' )
    `;
    await connection.query(paymentsQuery, [reservationCost, reservation_id]);
    await connection.commit();

    res.json({ message: "Reservation made successfully" });
  }
  catch (e) {
    console.error(e);
    await connection.rollback();
    res.status(500).json({ message: "An error occured while booking the reservation" });
  }
  finally {
    connection.release();
  }
}


