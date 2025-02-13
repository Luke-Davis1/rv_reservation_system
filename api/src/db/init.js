import { config } from 'dotenv';
import { createPool } from 'mysql2/promise';
config()

export const pool = createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  waitForConnections: true,
  multipleStatements: true,
  connectionLimit: 10,
  maxIdle: 10,
  idleTimeout: 60000,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});

console.success = (str) => console.log('\u2705', str);
console.failure = (str) => console.log('❌', str);

async function createDatabase() {
  const createQuery = `create database if not exists rv_park;`;
  await pool.query(createQuery);

  const selectQuery = `use rv_park;`;
  await pool.query(selectQuery);

  console.success("Database Created");
}

async function createTables() {
  const paymentsTableQuery = `
    CREATE TABLE IF NOT EXISTS \`payments\` (
      \`payment_id\` MEDIUMINT UNSIGNED NOT NULL AUTO_INCREMENT,
      \`amount\` DECIMAL(10,2),
      \`status\` VARCHAR(255),
      \`reservation_id\` MEDIUMINT UNSIGNED,
      \`payment_method\` VARCHAR(255),
      \`description\` VARCHAR(255),
      \`created_at\` DATETIME DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (\`payment_id\`)
    );
  `;

  const reservationTableQuery = `
    CREATE TABLE IF NOT EXISTS \`reservations\` (
      \`reservation_id\` MEDIUMINT UNSIGNED NOT NULL AUTO_INCREMENT,
      \`customer_id\` MEDIUMINT UNSIGNED,
      \`site_id\` TINYINT UNSIGNED,
      \`end_date\` DATE,
      \`start_date\` DATE,
      \`cost\` DECIMAL(10,2),
      \`notes\` VARCHAR(255),
      \`customer_comments\` VARCHAR(255),
      \`status\` VARCHAR(255),
      PRIMARY KEY (\`reservation_id\`),
      FOREIGN KEY (\`customer_id\`) REFERENCES \`customers\`(\`customer_id\`)
    );
  `;

  const customersTableQuery = `
    CREATE TABLE IF NOT EXISTS \`customers\` (
      \`customer_id\` MEDIUMINT UNSIGNED NOT NULL AUTO_INCREMENT,
      \`first_name\` VARCHAR(255),
      \`last_name\` VARCHAR(255),
      \`email\` VARCHAR(255),
      \`phone\` VARCHAR(20),
      \`rank\` VARCHAR(50),
      \`military_affiliation\` VARCHAR(100),
      \`military_status\` VARCHAR(50),
      PRIMARY KEY (\`customer_id\`)
    );
  `;

  const userCustomersTable = `
    CREATE TABLE IF NOT EXISTS \`user_customer\` (
      \`customer_id\` MEDIUMINT UNSIGNED NOT NULL,
      \`user_id\` MEDIUMINT UNSIGNED NOT NULL,
      PRIMARY KEY (\`customer_id\`, \`user_id\`),
      FOREIGN KEY (\`customer_id\`) REFERENCES \`customers\`(\`customer_id\`) ON DELETE CASCADE,
      FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`user_id\`) ON DELETE CASCADE
    );
  `;

  const usersTableQuery = `
    CREATE TABLE IF NOT EXISTS \`users\` (
      \`user_id\` MEDIUMINT UNSIGNED NOT NULL AUTO_INCREMENT,
      \`first_name\` VARCHAR(255),
      \`last_name\` VARCHAR(255),
      \`username\` VARCHAR(255),
      \`password\` VARCHAR(255),
      \`salt\` VARCHAR(255),
      \`email\` VARCHAR(255),
      \`type\` VARCHAR(50),
      PRIMARY KEY (\`user_id\`)
    );
  `;

  const siteTypeTable = `
    CREATE TABLE IF NOT EXISTS \`site_types\` (
      \`site_type_id\` TINYINT UNSIGNED NOT NULL,
      \`name\` VARCHAR(255),
      PRIMARY KEY (\`site_type_id\`)
    );
  `;

  const sitesTableQuery = `
    CREATE TABLE IF NOT EXISTS \`sites\` (
      \`site_id\` TINYINT UNSIGNED NOT NULL AUTO_INCREMENT,
      \`name\` VARCHAR(255),
      \`site_type_id\` TINYINT UNSIGNED NOT NULL,
      \`size\` TINYINT UNSIGNED,
      \`price_per_night\` DECIMAL(10,2),
      PRIMARY KEY (\`site_id\`),
      CONSTRAINT \`fk_sites_site_type\`
        FOREIGN KEY (\`site_type_id\`) REFERENCES \`site_types\`(\`site_type_id\`)
        ON DELETE CASCADE
        ON UPDATE CASCADE
    );
  `;

  await pool.query(paymentsTableQuery);
  console.success("Payments Table Created");
  await pool.query(customersTableQuery);
  console.success("Customers Table Created");
  await pool.query(reservationTableQuery);
  console.success("Reservations Table Created");
  await pool.query(usersTableQuery);
  console.success("Users Table Created");
  await pool.query(userCustomersTable);
  console.success("User Customers Table Created");
  await pool.query(siteTypeTable);
  console.success("Sites Type Table Created");
  await pool.query(sitesTableQuery);
  console.success("Sites Table Created");
}

async function populateSiteTypes() {
  const siteTypes = [
    { site_type_id: 1, name: 'Personal RV' },
    { site_type_id: 2, name: 'Base Provided Trailer' },
    { site_type_id: 3, name: 'Tent' },
    { site_type_id: 4, name: 'Dry Storage' }
  ]

  const insertQuery = `
    SET FOREIGN_KEY_CHECKS = 0;
    TRUNCATE site_types;
    INSERT INTO site_types (site_type_id, name) 
    VALUES ?;
    SET FOREIGN_KEY_CHECKS = 1;
  `;

  const values = siteTypes.map(type => [
    type.site_type_id,
    type.name,
  ]);

  await pool.query(insertQuery, [values]);
  console.success("Populated the site_types table.")
}

async function populateSites() {
  const sites = [
    { site_id: 1, name: '1', type: 1, size: 55, price_per_night: 25 },
    { site_id: 2, name: '2', type: 1, size: 40, price_per_night: 25 },
    { site_id: 3, name: '3', type: 1, size: 40, price_per_night: 25 },
    { site_id: 4, name: '4', type: 1, size: 40, price_per_night: 25 },
    { site_id: 5, name: '5', type: 1, size: 40, price_per_night: 25 },
    { site_id: 6, name: '6', type: 1, size: 40, price_per_night: 25 },
    { site_id: 7, name: '7', type: 1, size: 40, price_per_night: 25 },
    { site_id: 8, name: '8', type: 1, size: 40, price_per_night: 25 },
    { site_id: 9, name: '9', type: 1, size: 40, price_per_night: 25 },
    { site_id: 10, name: '10', type: 1, size: 40, price_per_night: 25 },
    { site_id: 11, name: '11', type: 1, size: 40, price_per_night: 25 },
    { site_id: 12, name: '11B', type: 2, size: 40, price_per_night: 25 },
    { site_id: 13, name: '12', type: 1, size: 40, price_per_night: 25 },
    { site_id: 14, name: '12B', type: 2, size: 40, price_per_night: 25 },
    { site_id: 15, name: '13', type: 1, size: 40, price_per_night: 25 },
    { site_id: 16, name: '14', type: 1, size: 40, price_per_night: 25 },
    { site_id: 17, name: '17', type: 1, size: 43, price_per_night: 25 },
    { site_id: 18, name: '18', type: 1, size: 43, price_per_night: 25 },
    { site_id: 19, name: '19', type: 1, size: 55, price_per_night: 25 },
    { site_id: 20, name: '20', type: 1, size: 43, price_per_night: 25 },
    { site_id: 21, name: '21', type: 1, size: 55, price_per_night: 25 },
    { site_id: 22, name: '22', type: 1, size: 43, price_per_night: 25 },
    { site_id: 23, name: '23', type: 1, size: 43, price_per_night: 25 },
    { site_id: 24, name: '24', type: 1, size: 43, price_per_night: 25 },
    { site_id: 25, name: '25', type: 1, size: 43, price_per_night: 25 },
    { site_id: 26, name: '26', type: 1, size: 43, price_per_night: 25 },
    { site_id: 27, name: '27', type: 1, size: 43, price_per_night: 25 },
    { site_id: 28, name: '28', type: 1, size: 43, price_per_night: 25 },
    { site_id: 29, name: '29', type: 1, size: 43, price_per_night: 25 },
    { site_id: 30, name: '30', type: 1, size: 43, price_per_night: 25 },
    { site_id: 31, name: '31', type: 1, size: 43, price_per_night: 25 },
    { site_id: 32, name: '32', type: 1, size: 65, price_per_night: 25 },
    { site_id: 33, name: '33', type: 1, size: 65, price_per_night: 25 },
    { site_id: 34, name: '34', type: 1, size: 65, price_per_night: 25 },
    { site_id: 35, name: '35', type: 1, size: 65, price_per_night: 25 },
    { site_id: 36, name: '36', type: 1, size: 65, price_per_night: 25 },
    { site_id: 37, name: '37', type: 1, size: 65, price_per_night: 25 },
    { site_id: 38, name: '38', type: 1, size: 65, price_per_night: 25 },
    { site_id: 39, name: '39', type: 1, size: 65, price_per_night: 25 },
    { site_id: 40, name: '40', type: 1, size: 65, price_per_night: 25 },
    { site_id: 41, name: '41', type: 1, size: 65, price_per_night: 25 },
    { site_id: 42, name: '42', type: 1, size: 65, price_per_night: 25 },
    { site_id: 43, name: '43', type: 1, size: 65, price_per_night: 25 },
    { site_id: 44, name: '44', type: 1, size: 65, price_per_night: 25 },
    { site_id: 45, name: '45', type: 1, size: 65, price_per_night: 25 },
    { site_id: 46, name: "TENT", type: 3, size: 0, price_per_night: 17 },
    { site_id: 47, name: 'A', type: 4, size: 0, price_per_night: 17 },
    { site_id: 48, name: 'B', type: 4, size: 0, price_per_night: 17 },
    { site_id: 49, name: 'C', type: 4, size: 0, price_per_night: 17 },
    { site_id: 50, name: 'D', type: 4, size: 0, price_per_night: 17 },
  ];

  const insertQuery = `
    TRUNCATE sites;
    INSERT INTO sites (site_id, name, site_type_id, size, price_per_night) 
    VALUES ?;
  `;

  const values = sites.map(site => [
    site.site_id,
    site.name,
    site.type,
    site.size,
    site.price_per_night
  ]);

  await pool.query(insertQuery, [values]);
  console.success("Populated the sites table.")
}

async function initDatabase() {
  const start = performance.now();
  await createDatabase();
  await createTables();
  await populateSiteTypes();
  await populateSites();

  console.log("Done", Math.round(performance.now() - start), 'ms')

  pool.end();
}

void initDatabase();