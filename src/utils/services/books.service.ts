import { prisma } from "../../../lib/prisma";

const getBookById = async (id: string | undefined) => {
  console.log("id", id);
  if (id) {
    const res = await prisma.books.findUnique({
      where: { id },
    });
    console.log("res book by id", res);
    if (!res?.id) {
      return { success: true, message: "Book with this id does not exist" };
    }
    return { success: true, data: res };
  }
};

const getBookByName = async (bookname: string | undefined) => {
  if (!bookname) {
    return { success: false, message: "Please provide book name" };
  }
  const res = await prisma?.books.findMany({
    where: { bookName: { contains: bookname } },
  });
  if (res.length < 1) {
    return { success: true, message: "Book does not exist" };
  }
  return { success: true, data: res };
};

const getBookByCatagory = async (bookCatagory: string | undefined) => {
  if (!bookCatagory) {
    return { success: false, message: "No catagory provided" };
  }
  const res = await prisma?.books.findMany({
    where: { bookCatagory: { contains: bookCatagory } },
  });
  console.log("res book by catagory", res);
  if (res.length < 1) {
    return { success: true, message: "Catagory does not exist" };
  }
  return { success: true, data: res };
};

const getBookByPublisher = async (bookPublisher: string | undefined) => {
  console.log("name", bookPublisher);
  if (!bookPublisher) {
    return { success: false, message: "No publisher provided" };
  }
  const res = await prisma?.books.findMany({
    where: { bookPublisher: { contains: bookPublisher } },
  });
  if (res.length < 1) {
    return { success: true, message: "Publisher does not exist" };
  }
  console.log("res book by catagory", res);
  return { success: true, data: res };
};

export { getBookById, getBookByName, getBookByCatagory, getBookByPublisher };
