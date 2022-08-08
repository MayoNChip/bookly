import { Button, Flex } from "@chakra-ui/react";
import axios from "axios";
import { NextPage, GetStaticProps } from "next";
import Navbar from "./components/Navbar";
import Search from "./components/Search";
import { prisma } from "../../lib/prisma";
import { Books } from "@prisma/client";
import { useState } from "react";
// import Navbar from "../components/Navbar";
// import Search from "../components/Search";

interface HomeProps {
  books: Books[];
}

// type books = {
//   books: {
//     id: number;
//     bookName: string;
//     bookCatagory: string;
//     bookPublisher: String;
//     bookShelf: string;
//   };
// }[];

const index: NextPage<HomeProps> = (props) => {
  const { books } = props;
  const [allBooks, setAllBooks] = useState(books);

  const handleGetBooks = async () => {
    const response = await axios.get("http://localhost:3000/api");
    console.log("get books res ", response);
    setAllBooks(response.data.data);
  };
  console.log("props", props.books);
  return (
    <Flex
      direction="column"
      w="100vw"
      h="100vh"
      bg="gray.700"
      alignItems="center"
    >
      <Navbar />
      <Flex
        w={["90%", "80%"]}
        bg="gray.300"
        my="10px"
        borderRadius="md"
        direction="column"
        pb="15px"
        mb="15px"
      >
        {/* <Search /> */}
        <Button onClick={handleGetBooks}>get books</Button>
        <Search books={allBooks} />
      </Flex>
    </Flex>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const books = await prisma.books.findMany();
  return {
    props: {
      books,
    },
  };
};

export default index;
