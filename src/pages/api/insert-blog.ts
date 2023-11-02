import insertBlog from "@/modules/next-backend/insert-blog";
import { NextApiRequest, NextApiResponse } from "next";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { author, slug, title, cover, content } = req.query;

  if (author == null || Array.isArray(author)) {
    res.status(400).json({ error: "Wrong input format in author", ok: false });
    return;
  }

  if (slug == null || Array.isArray(slug)) {
    res.status(400).json({ error: "Wrong input format in slug", ok: false });
    return;
  }

  if (title == null || Array.isArray(title)) {
    res.status(400).json({ error: "Wrong input format in title", ok: false });
    return;
  }

  if (cover == null || Array.isArray(cover)) {
    res.status(400).json({ error: "Wrong input format in cover", ok: false });
    return;
  }

  if (content == null || Array.isArray(content)) {
    res.status(400).json({ error: "Wrong input format in html content", ok: false });
    return;
  }

  try {
    console.log("AUTHOR IS: ", author);
    const result = await insertBlog(author, slug, title, cover, content);

    /**
     * The `result` here has the following format:
     * OkPacket { affectedRows: 1, insertId: 0n, warningStatus: 0 }
     * Since `insertId` is of type `bigint`, it causes explosion when parsing JSON
     * => We need a bignum JSON parsing (we already did it with TEIKI????) (or just leave it!)
     */
    console.log("RESULT AFTER INSERT BLOG: ", result);

    res.status(200).json({ response: result, ok: true });
  } catch (error) {
    console.warn(error);
    res.status(500).json({ error: "Something wrong when insert blog into database" });
  }
}
