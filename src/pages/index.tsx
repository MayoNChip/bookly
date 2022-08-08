import { Button, Flex } from "@chakra-ui/react";
import axios from "axios";
import { GetServerSideProps, NextPage } from "next";
import Navbar from "./components/Navbar";
import Search from "./components/Search";
// import Navbar from "../components/Navbar";
// import Search from "../components/Search";

type props = {
  books: {
    id: number;
    bookName: string;
    bookCatagory: string;
    bookPublisher: String;
    bookShelf: string;
  }[];
};

const index: NextPage<props> = (props: props) => {
  const handleGetBooks = async () => {
    const response = await axios.get("http://localhost:3000/api");
    console.log("get books res ", response);
  };
  console.log("props", props?.books);
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
        <Search />
        <Button onClick={handleGetBooks}>get books</Button>
        {/* <Search books={props?.books} /> */}
      </Flex>
    </Flex>
  );
};

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const res = await axios("http://localhost:3000/api/books/allbooks");
//   return {
//     props: {
//       books: res?.data.data,
//     },
//   };
// };

export default index;
