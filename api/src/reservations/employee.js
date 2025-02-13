import { pool } from "../db/index.js";
import { getAvailableSites, getReservationCost } from "../db/procedures.js";

export async function employeeBookReservation(req, res) {
  const { reservationDetails, customerDetails } = req.body;
  const { siteId, endDate, startDate, notes, comments } = reservationDetails;

  if (siteId === undefined || endDate === undefined || startDate === undefined) return res.status(400).json({ message: 'Missing required paramerter' });

  const availableSites = await getAvailableSites(startDate, endDate);
  if (availableSites.findIndex(site => site.site_id === Number(siteId)) === -1) return res.status(400).json({ message: "Site is not available" });

  const connection = await pool.getConnection();
  try {
    const reservationCost = await getReservationCost(siteId, startDate, endDate);

    await connection.beginTransaction();

    const customerQuery = `
      insert into customers (first_name, last_name, phone)
      values (?,?,?)
    `;

    const [customerResult] = await connection.query(customerQuery, [customerDetails.firstName, customerDetails.lastName, customerDetails.phone]);
    const customer_id = customerResult.insertId;
    if (customer_id === undefined) throw Error("An issue occurred adding a new customer");

    const reservationsQuery = `
      insert into reservations
      (customer_id, site_id, end_date, start_date, cost, notes, customer_comments, status)
      values (?,?,?,?,?,?,?, 'Booked')
    `;

    const [result] = await connection.query(reservationsQuery, [customer_id, siteId, endDate, startDate, reservationCost, notes ?? '', comments ?? '']);
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