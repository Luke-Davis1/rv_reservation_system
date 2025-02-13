import dayjs from 'dayjs';
import { pool } from "./index.js";

/**
 * Calculate the cost of reserving a site between two dates
 * @param {number | string} siteId 
 * @param {string} startDate 
 * @param {string} endDate 
 * @returns {Promise<number>} cost of reservation
 */
export async function getReservationCost(siteId, startDate, endDate) {
  const nights = dayjs(endDate).diff(startDate, 'days');

  const siteQuery = `select price_per_night from sites where site_id = ?`
  const [result] = await pool.query(siteQuery, [siteId]);
  const firstRow = result[0];
  if (firstRow === undefined) return;

  return firstRow.price_per_night * nights;
}

/**
 * Get a list of available sites for the provided parameters
 * @param {string} startDate 
 * @param {string} endDate 
 * @param {string | undefined} siteType 
 * @param {number | undefined} length 
 * @returns {Promise<object[]>} A list of available sites
 */
export async function getAvailableSites(startDate, endDate, siteTypeId, length) {
  const query = `
    SELECT DISTINCT site_id, price_per_night, size, s.site_type_id, st.name AS site_type_name, s.name AS site_name
    FROM sites s
    JOIN site_types st ON s.site_type_id = st.site_type_id
    WHERE site_id NOT IN (
      SELECT r.site_id
      FROM reservations r
      WHERE (
        (r.start_date <= ? AND r.end_date >= ?)
        OR
        (r.start_date >= ? AND r.start_date <= ?)
      )
      AND r.status = 'Booked'
    )
    ${siteTypeId !== undefined ? 'AND s.site_type_id = ?' : ''}
    ${siteTypeId === '1' && length !== undefined ? 'AND size > ?' : ''}
  `;

  const parameters = [endDate, startDate, startDate, endDate];

  // Add `siteTypeId` parameter if it's defined
  if (siteTypeId !== undefined) {
    parameters.push(siteTypeId);
  }

  // Add `length` parameter if `siteTypeId === 1` and `length` is provided
  if (siteTypeId === '1' && length !== undefined) {
    parameters.push(length);
  }

  // Execute the query with the parameters
  const [results] = await pool.query(query, parameters);
  return results;
}

/**
 * Get the Customer Id for the provided User
 * @param {number} userId 
 * @returns {Promise<number>} customer_id
 */
export async function getUserCustomerId(userId) {
  const customerIdQuery = `select customer_id from user_customer where user_id = ? limit 1`;
  const [customerResults] = await pool.query(customerIdQuery, [userId]);
  const firstRow = customerResults[0];
  if (firstRow === undefined) return;

  const { customer_id } = firstRow;
  return customer_id;
}