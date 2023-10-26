import * as mysql from "mysql2/promise";

export const pool = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  port: 3308,
  password: "example",
  database: "mytable",
  waitForConnections: true,
  connectionLimit: 10,
});
