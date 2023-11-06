import { pool } from "./db";

export async function insertBlog(author: string, slug?: string, title?: string, cover?: string, content?: string) {
  let connection;
  try {
    connection = await pool.getConnection();
    const ret = await connection.query(
      'INSERT INTO blog(`slug`, `title`, `cover`, `content`, `author`) value(?, ?, ?, ?, ?)',
      [slug, title, cover, content, author]
    );
    connection.destroy();
    return ret;
  } catch (error) {
    let message = 'Unknown Error'
    if (error instanceof Error) message = error.message;
    throw new Error(message);
  }
}

export async function insertBlogTopic(blogId: number, topicIDs: number[]) {
  let connection;
  try {
    connection = await pool.getConnection();
    let result = [];
    for (let i = 0; i < topicIDs.length; i++) {
      const ret = await connection.query(
        'INSERT INTO blog_topic value(?, ?)',
        [blogId, topicIDs[i]]
      );
      result.push(ret);
    }
    connection.destroy();
    return result;
  } catch (error) {
    let message = 'Unknown Error'
    if (error instanceof Error) message = error.message;
    throw new Error(message);
  }
}

export async function insertUser(username: string, password: string, userID: string) {
  let connection;
  try {
    connection = await pool.getConnection();
    const checkUser = await connection.query(
      `select * from user where username=? AND password=?`, [username, password]
    )
    console.log("CHECK_USER: ", checkUser);
    if (Array.isArray(checkUser[0]) && checkUser[0].length == 1) {
      return {
        logged: true,
        info: checkUser[0],
      }
    }

    const ret = await connection.query(
      'INSERT INTO user value(?, ?, ?)',
      [userID, username, password]
    );
    connection.destroy();
    return {
      logged: false,
      info: ret,
    }
  } catch (error) {
    let message = 'Unknown Error'
    if (error instanceof Error) message = error.message;
    throw new Error(message);
  }
}

export async function queryAllPosts() {
  let connection;
  try {
    connection = await pool.getConnection();
    const ret = await connection.query(
      `select blog.*, user.username AS authorName, group_concat(topic.name) as topic from
          blog inner join user on blog.author = user.userID
          inner join blog_topic bt on blog.id =  bt.blogId
          inner join topic on bt.topicID = topic.topicID
        group by blog.id
      `
    );
    connection.destroy();
    return ret;
  } catch (error) {
    let message = 'Unknown Error'
    if (error instanceof Error) message = error.message;
    throw new Error(message);
  }
}

export async function queryUserPosts(userID: string) {
  let connection;
  try {
    connection = await pool.getConnection();
    const ret = await connection.query(
      `select blog.*, user.username AS authorName, group_concat(topic.name) as topic from
          blog inner join user on blog.author = user.userID
          inner join blog_topic bt on blog.id =  bt.blogId
          inner join topic on bt.topicID = topic.topicID
        where ${`blog.author = '${userID}'`}
        group by blog.id
      `
    );
    connection.destroy();
    return ret;
  } catch (error) {
    let message = 'Unknown Error'
    if (error instanceof Error) message = error.message;
    throw new Error(message);
  } 
}

export async function queryBlogContent(slug: string) {
  let connection;
  try {
    connection = await pool.getConnection();
    const ret = await connection.query('select content from blog where slug = ?', [slug]);
    connection.destroy();
    return ret;
  } catch (error) {
    let message = 'Unknown Error'
    if (error instanceof Error) message = error.message;
    throw new Error(message);
  }
}

export async function queryBlogID(slug: string) {
  let connection;
  try {
    connection = await pool.getConnection();
    const ret = await connection.query('SELECT id FROM blog WHERE slug = ?', [slug]);
    connection.destroy();
    
    if (Array.isArray(ret[0]) && ret[0].length === 1) {
      const row = ret[0][0] as { id: number };
      return row.id;
    }
    
    return null;
  } catch (error) {
    let message = 'Unknown Error';
    if (error instanceof Error) message = error.message;
    throw new Error(message);
  }
}


export async function insertComment(blogId: number, content: string, userId: string) {
  let connection;
  try {
    connection = await pool.getConnection();
    const ret = await connection.query(
      'INSERT INTO comment(`blogID`, `content`, `userID`) VALUES (?, ?, ?)',
      [blogId, content, userId]
    );
    connection.destroy();
    return ret;
  } catch (error) {
    let message = 'Unknown Error';
    if (error instanceof Error) message = error.message;
    throw new Error(message);
  }
}

export async function queryBlogComments(blogId: number) {
  let connection;
  try {
    connection = await pool.getConnection();
    const ret = await connection.query(
      'SELECT commentID, content, userID FROM comment WHERE blogID = ?',
      [blogId]
    );
    connection.destroy();
    return ret;
  } catch (error) {
    let message = 'Unknown Error';
    if (error instanceof Error) message = error.message;
    throw new Error(message);
  }
}

