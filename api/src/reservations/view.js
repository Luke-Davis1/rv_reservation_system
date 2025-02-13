import { pool } from "../db/index.js";
import { getAvailableSites, getUserCustomerId } from "../db/procedures.js";

export async function viewReservations(req, res) {
  const customerId = await getUserCustomerId(req.user.user_id);
  if (customerId === undefined) return res.status(401).json({ message: 'Unknown customer' });

  const query = `
    select reservation_id, r.site_id as site_id, s.name as site_name, st.name as site_type_name, s.size as size, s.site_type_id as site_type, end_date, start_date, cost, notes, customer_comments, status
    from reservations r
    join sites s on r.site_id = s.site_id
    join site_types st on s.site_type_id = st.site_type_id
    where customer_id = ?;
  `;
  const [results] = await pool.query(query, [customerId]);
  res.json(results);
}

export async function availableSites(req, res) {
  const { startDate, endDate, siteType, length, pcs } = req.query;
  if (startDate === undefined || endDate === undefined || siteType === undefined) return res.status(400).json({ message: 'Invalid request parameters' });
  const availableSites = await getAvailableSites(startDate, endDate, siteType, length);

  res.json(availableSites);
}

export async function employeeViewReservations(req, res) {
  // Search for any reservations on the specific day
  const { desiredDate } = req.query;

  if (!desiredDate) {
    return res.status(400).json({ message: "Missing parameters, try again" });
  }

  // Convert date to correct format
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/; // Regex for yyyy-mm-dd format
  if (!dateRegex.test(desiredDate)) {
    return res.status(400).json({ message: "Invalid date format. Please use yyyy-mm-dd." });
  }

  // Check that it is a real date
  const parsedDate = new Date(desiredDate);
  if (isNaN(parsedDate.getTime())) {
    return res.status(400).json({ message: "Invalid date provided." });
  }

  const reservationsQuery = `
    SELECT r.reservation_id, s.name as site_name, CONCAT(c.first_name, ' ', c.last_name) as customer_name, c.phone, start_date, end_date, customer_comments, status
    FROM reservations r
    JOIN customers c ON r.customer_id = c.customer_id
    JOIN sites s ON s.site_id = r.site_id
    WHERE r.start_date <= ? AND r.end_date >= ?
    AND status = 'Booked';
  `; 

  try {
    const [reservations] = await pool.query(reservationsQuery, [desiredDate, desiredDate]);
    return res.json(reservations);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function employeeViewAvailableSlots(req, res) {
  const { startDate, endDate } = req.query;
  if (startDate === undefined || endDate === undefined) return res.status(400).json({ message: 'Invalid request parameters' });

  const query = `
      SELECT DISTINCT s.site_id, s.price_per_night, s.size, st.name AS site_type_name, s.name 
      FROM sites s
      INNER JOIN site_types st ON st.site_type_id = s.site_type_id
      WHERE s.site_id NOT IN (
        SELECT r.site_id 
        FROM reservations r
        WHERE (
          (r.start_date <= ? AND r.end_date >= ?)
          OR
          (r.start_date >= ? AND r.start_date <= ?)
        )
        AND r.status = 'Booked'
      )
  `;
  const [results] = await pool.query(query, [endDate, startDate, startDate, endDate]);
  res.json(results);
}

export async function employeeViewReservationDetails(req, res) {
  // Search for any reservations on the specific day
  const { reservationId } = req.query;

  if (!reservationId) {
    return res.status(400).json({ message: "Missing parameters, try again" });
  }

  const reservationDetailsQuery = `
    SELECT s.name as site_name, t.name as type, s.price_per_night, s.size, c.first_name, c.last_name, c.phone, start_date, end_date, customer_comments, status, r.cost as total_payment, r.notes 
    FROM reservations r
    JOIN customers c ON r.customer_id = c.customer_id
    JOIN sites s ON s.site_id = r.site_id
    JOIN site_types t on s.site_type_id = t.site_type_id
    WHERE r.reservation_id = ?;
  `;

  try {
    const [reservationDetails] = await pool.query(reservationDetailsQuery, [reservationId]);
    return res.json(reservationDetails[0]);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
}