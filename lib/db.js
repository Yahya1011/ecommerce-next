import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: "localhost",
  user: "root", // sesuaikan username mysql anda
  password: "", // sesuaikan password mysql anda
  database: "ecommerce_next",
  waitForConnections: true,
  connectionLimit: 10,
});

export default pool;
