import { insertUser } from "@/modules/mysql/main";
import { NextApiRequest, NextApiResponse } from "next";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { username, password, userID } = req.query;

  if (username == null || Array.isArray(username)) {
    res.status(400).json({ error: "Wrong input format in username", ok: false });
    return;
  }

  if (password == null || Array.isArray(password)) {
    res.status(400).json({ error: "Wrong input format in password", ok: false });
    return;
  }

  if (userID == null || Array.isArray(userID)) {
    res.status(400).json({ error: "Wrong input format in userID", ok: false });
    return;
  }

  try {
    const result = await insertUser(username, password, userID);

    /**
     * The `result` here has the following format:
     * OkPacket { affectedRows: 1, insertId: 0n, warningStatus: 0 }
     * Since `insertId` is of type `bigint`, it causes explosion when parsing JSON
     * => We need a bignum JSON parsing (we already did it with TEIKI????) (or just leave it!)
     */
    console.log("RESULT AFTER INSERT: ", result);

    res.status(200).json({ response: result, ok: true });
  } catch (error) {
    console.warn(error);
    res.status(500).json({ error: "Something wrong when insert user into database" });
  }
}
