import { MongoClient } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const uri = process.env.MONGODB_URI || "";
    const client = await MongoClient.connect(uri);
    res.status(200).json({ status: "ok" });
  } catch (error: unknown) {
    console.error("Health check error:", error);

    if (error instanceof Error) {
      res.status(500).json({ status: "error", error: error.message });
    } else {
      res.status(500).json({ status: "error", error: "Произошла неизвестная ошибка" });
    }
  }
};

export default handler;