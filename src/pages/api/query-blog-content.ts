// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { queryAllPosts, queryBlogContent } from "@/modules/mysql/main";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { slug } = req.query;

  if (slug == null || typeof slug !== "string") {
    res.status(400).json({ error: "Wrong input format in slug", ok: false });
    return;
  }

  try {
    const result = await queryBlogContent(slug);
    res.status(200).json({ posts: result });
  } catch (error) {
    console.warn(error);
    res.status(500).json({ error: "Interal server error" });
  }
}
