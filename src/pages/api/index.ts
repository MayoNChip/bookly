import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";
import NextCors from "nextjs-cors";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await NextCors(req, res, {
    // Options
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });

  const allBooks = await prisma.books.findMany();
  console.log("all books res", allBooks);
  res.status(200).json({ success: true, data: allBooks });
};

export default handler;
