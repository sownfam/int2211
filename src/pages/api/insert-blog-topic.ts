import { insertBlogTopic } from "@/modules/mysql/main";
import { NextApiRequest, NextApiResponse } from "next";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { blogId, topicIds } = req.query;

  if (blogId == null || Array.isArray(blogId)) {
    res.status(400).json({ error: "Wrong input format in blogId", ok: false });
    return;
  }

  if (topicIds == null) {
    res.status(400).json({ error: "Wrong input format in topicIds", ok: false });
    return;
  }
  let _topicIds: string[] = [];
  if (!Array.isArray(topicIds)) _topicIds = [topicIds];
  else _topicIds = topicIds;

  try {
    const result = await insertBlogTopic(parseInt(blogId), _topicIds.map((t) => parseInt(t)));

    /**
     * The `result` here has the following format:
     * OkPacket { affectedRows: 1, insertId: 0n, warningStatus: 0 }
     * Since `insertId` is of type `bigint`, it causes explosion when parsing JSON
     * => We need a bignum JSON parsing (we already did it with TEIKI????) (or just leave it!)
     */
    console.log("RESULT AFTER INSERT BLOG TOPIC: ", result);

    res.status(200).json({ response: result, ok: true });
  } catch (error) {
    console.warn(error);
    res.status(500).json({ error: "Something wrong when insert blog topic into database" });
  }
}
