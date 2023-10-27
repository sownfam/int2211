// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { queryAllPosts } from "@/modules/mysql/main";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const result = await queryAllPosts();
    res.status(200).json({ posts: result });
  } catch (error) {
    console.warn(error);
    res.status(500).json({ error: "Interal server error" });
  }
}
