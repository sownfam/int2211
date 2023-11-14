import { insertUser } from "@/modules/mysql/main";
import { NextApiRequest, NextApiResponse } from "next";
import * as bcrypt from "bcrypt";
import { SYSTEM_ENTRYPOINTS } from "next/dist/shared/lib/constants";

export async function comparePasswords(plainPassword: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(plainPassword, hashedPassword);
}

export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

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
    const hashedPassword = await hashPassword(password);
    console.log(hashedPassword + " " + hashedPassword.length);
    if(await comparePasswords(password, hashedPassword) == false) {
      res.status(500).json({ error: "Something wrong when compare passwords", ok: false });
      return;
    }
    const result = await insertUser(username, hashedPassword, userID);

    /**
     * The `result` here has the following format:
     * OkPacket { affectedRows: 1, insertId: 0n, warningStatus: 0 }
     * Since `insertId` is of type `bigint`, it causes explosion when parsing JSON
     * => We need a bignum JSON parsing (we already did it with TEIKI????) (or just leave it!)
     */
    console.log("RESULT AFTER INSERT USER: ", result);

    res.status(200).json({ response: result, ok: true });
  } catch (error) {
    console.warn(error);
    res.status(500).json({ error: "Something wrong when insert user into database" });
  }
}

