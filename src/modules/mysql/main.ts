import { pool } from "./db";

async function select() {
  let connection;
  try {
    connection = await pool.getConnection();
    const ret = await connection.query('select * from blog');
    connection.destroy();
    return ret;
  } catch(error) {
    console.log(error);
  }
}

async function describe() {
  let connection;
  try {
    connection = await pool.getConnection();
    const ret = await connection.query('describe blog');
    connection.destroy();
    console.log(ret);
    return ret;
  } catch(error) {
    console.log(error);
  }
}
