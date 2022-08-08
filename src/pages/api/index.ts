import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const allBooks = await prisma.books.findMany();
  console.log("all books res", allBooks);
  res.status(200).json({ success: true, data: allBooks });
};

export default handler;
