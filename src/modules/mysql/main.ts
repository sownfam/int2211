import { pool } from "./db";

export async function insertBlog(id: string, slug?: string, title?: string, categories?: string, cover?: string, content?: string) {
  let connection;
  try {
    connection = await pool.getConnection();
    const ret = await connection.query(
      'INSERT INTO blog value(?, ?, ?, ?, ?, ?)',
      [id, slug, title, categories, cover, content]
    );
    connection.destroy();
    return ret;
  } catch(error) {
    console.log(error);
  }
}

export async function queryAllPosts() {
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

export async function queryBlogContent(slug: string) {
  let connection;
  try {
    connection = await pool.getConnection();
    const ret = await connection.query('select content from blog where slug = ?', [slug]);
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
