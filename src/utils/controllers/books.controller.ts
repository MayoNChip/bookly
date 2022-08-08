import { prisma } from "../../../lib/prisma";
import {
  getBookByCatagory,
  getBookById,
  getBookByName,
  getBookByPublisher,
} from "../services/books.service";

type query = {
  bookname?: string;
  id?: string;
  bookpublisher?: string;
  bookcatagory?: string;
}[];

const getAllBooks = async () => {
  try {
    const books = await prisma.books.findMany();
    return { success: true, data: books };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

const searchBooks = async (query: query) => {
  console.log("req", query);
  const res = query.map(async (item, i) => {
    console.log("key name", Object.keys(query[i]).toString());
    switch (Object.keys(query[i]).toString()) {
      case "id":
        return await getBookById(item.id);
        break;
      case "bookpublisher":
        return await getBookByPublisher(item.bookpublisher);
        break;
      case "bookcatagory":
        return await getBookByCatagory(item.bookcatagory);
        break;
      case "bookname":
        return await getBookByName(item.bookname);
        break;
      default:
        return { success: false, message: "No query provided" };
    }
  });
  console.log("res in controller", res);
  const results = await Promise.all(res);
  return results;
};
export { getAllBooks, searchBooks };
