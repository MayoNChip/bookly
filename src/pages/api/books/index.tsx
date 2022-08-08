import { NextApiRequest, NextApiResponse } from "next";
import { searchBooks } from "../../../utils/controllers/books.controller";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // const params = [
  //   { bookName: "kitzur" },
  //   { bookId: "cl6f0gwwi0009lkvkx3aiakl8" },
  // ];
  const params = [req.query];
  console.log(params);
  if (
    params[0].bookname ||
    params[0].id ||
    params[0].bookcatagory ||
    params[0].bookpublisher
  ) {
    const response = await searchBooks(params);
    console.log("res from index", response);
    res.send(response);
  } else {
    res.send({ success: false, message: "no search value" });
  }
}
