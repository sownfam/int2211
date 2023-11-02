// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { queryUserPosts } from "@/modules/mysql/main";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { userID } = req.query;

    if (userID == null || Array.isArray(userID)) {
      res.status(400).json({ error: "Wrong input format in userID (query-all-posts)", ok: false });
      return;
    }

    const result = await queryUserPosts(userID);
    res.status(200).json({ posts: result });
  } catch (error) {
    console.warn(error);
    res.status(500).json({ error: "Interal server error" });
  }
}
