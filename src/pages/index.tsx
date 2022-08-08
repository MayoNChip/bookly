import { Button, Flex } from "@chakra-ui/react";
import axios from "axios";
import { GetServerSideProps, NextPage } from "next";
import Navbar from "./components/Navbar";
import Search from "./components/Search";
// import Navbar from "../components/Navbar";
// import Search from "../components/Search";

type books = {
  books: {
    id: number;
    bookName: string;
    bookCatagory: string;
    bookPublisher: String;
    bookShelf: string;
  };
}[];

const index: NextPage<books> = (books: books) => {
  const handleGetBooks = async () => {
    const response = await axios.get("http://localhost:3000/api");
    console.log("get books res ", response);
  };
  console.log("props", books);
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
        <Search books={books?.books} />
      </Flex>
    </Flex>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await axios("http://localhost:3000/api/");
  return {
    props: {
      books: res.data.data,
    },
  };
};

export default index;
