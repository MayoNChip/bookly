import {
  Button,
  Divider,
  Flex,
  Heading,
  Input,
  Select,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { FormControl, FormLabel } from "@chakra-ui/react";
import APIProvider from "../../utils/getSearchResults";
import { FormikProvider, useFormik } from "formik";
import { Books } from "@prisma/client";
import BooksTables from "./BooksTables";
import Toast from "../../utils/genToast";

export default function Search({ books }: { books: Books[] }) {
  console.log("books from search componenet ", books);
  const [searchBy, setSearchBy] = useState("bookname");
  const [isCatagory, setIsCatagory] = useState(false);
  const [searchResult, setSearchResult] = useState(books);
  const toast = useToast();
  const { genToast } = Toast();

  const formik = useFormik({
    initialValues: {
      searchBy: searchBy,
      searchValue: "",
      catagory: "",
    },
    onSubmit: async (values) => {
      if (isCatagory === true) {
        console.log("search by catagorty", values.catagory);
        const res = await APIProvider.getSearchResults(
          values.searchBy,
          values.catagory
        );
        console.log("search be catagory res", res);
        if (res.length === 0) {
          genToast("error", "אירעה שגיאה", "נא לנסות שוב");
        }
        return setSearchResult(res);
      }
      const res = await APIProvider.getSearchResults(
        values.searchBy,
        values.searchValue
      );
      console.log("res from formik", res);
      if (res?.success === false) {
        console.log("we have an error");
        console.log(res);
        genToast("error", "שגיאה", "נא להכניס ערך חיפוש");

        return setSearchResult(books);
      }
      console.log("res message not found", res);
      if (res.message) {
        switch (res.message) {
          case "Book does not exist":
            setSearchResult(books);
            return genToast(
              "error",
              "ספר לא נמצא",
              "בדוק אם שם הספר כתוב נכון"
            );
            break;
          case "Publisher does not exist":
            setSearchResult(books);
            return genToast(
              "error",
              "הוצאה לא קיימת",
              "לא נמצא ספר עם ההוצאה הנבחרת"
            );
            break;
        }
        return setSearchResult(books);
      }
      setSearchResult(res);
    },
  });

  const getCatagoryList = () => {
    const catagoryList = books.map((book) => book.bookCatagory);
    console.log("catagories", catagoryList);
    const uniqueCatagoryList = [...new Set(catagoryList)];
    console.log("catagories", uniqueCatagoryList);
    return catagoryList;
  };

  return (
    // <Flex>{props.books && props.books.map((book: Books) => book.id)}</Flex>
    <>
      <FormikProvider value={formik}>
        <Flex
          w="100%"
          mt="20px"
          mr="10px"
          direction="column"
          borderColor="red.500"
          border="20px"
        >
          <Heading
            mx={["0", "0", "auto"]}
            // mx="10px"
            my="10px"
            textColor="gray.800"
          >
            בוטיק הספרים של ישיבת
          </Heading>
          <Divider textColor="gray.900" bg="gray.900" w="90%" mx="auto" />
        </Flex>
        <Flex
          w="100%"
          mt="15px"
          alignItems="center"
          justifyContent="center"
          direction="row"
        >
          <Flex
            direction="column"
            w={["100%", "80%"]}
            mt={["0", "10px"]}
            alignItems="center"
          >
            <Heading mr="15px" mb="40px" fontSize={["lg", "2xl"]}>
              ספרים רבותיי, ספרים, רק היום, ספרי לימוד במחיר הכרם!
            </Heading>

            <form onSubmit={formik.handleSubmit}>
              <Flex w="100%" alignItems="center" justifyContent="center">
                <Flex w="95%" alignItems="center" direction={["column", "row"]}>
                  <FormControl
                    w="240px"
                    as={Flex}
                    flexDir="row"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Flex
                      h="40px"
                      alignItems="center"
                      borderStartRadius={"md"}
                      p="5px"
                      bg="gray.200"
                    >
                      <FormLabel
                        htmlFor="searchBy"
                        m="0"
                        mr="5px"
                        minW="60px"
                        borderEndRadius={"0"}
                      >
                        חפש לפי
                      </FormLabel>
                    </Flex>
                    <Select
                      w="120px"
                      id="searchBy"
                      defaultValue={searchBy}
                      borderRadius="0"
                      _focus={{ border: "none", outline: "none" }}
                      onChange={(e) => {
                        if (e.target.value === "bookcatagory") {
                          setIsCatagory(true);
                        } else {
                          setIsCatagory(false);
                        }
                        setSearchBy(formik.values.searchBy);
                        formik.handleChange(e);
                      }}
                    >
                      <option value="bookname">שם ספר</option>
                      <option value="bookpublisher">הוצאה</option>
                      <option value="bookcatagory">קטגוריה</option>
                    </Select>
                  </FormControl>

                  <FormControl mt={["10px", "0px"]}>
                    {formik.values.searchBy === "bookcatagory" ? (
                      <Select
                        name="catagory"
                        id="catagory"
                        minW="120px"
                        defaultValue={formik.values.catagory}
                        borderRadius="0"
                        _focus={{ border: "none", outline: "none" }}
                        onChange={formik.handleChange}
                      >
                        {getCatagoryList().map((catagory, i) => (
                          <option key={i} value={catagory}>
                            {catagory}
                          </option>
                        ))}
                      </Select>
                    ) : (
                      <Input
                        name="searchValue"
                        id="searchValue"
                        borderRadius="0"
                        onChange={formik.handleChange}
                        _focus={{ border: "none", outline: "none" }}
                        placeholder="חפש..."
                      />
                    )}
                  </FormControl>

                  <Button
                    type="submit"
                    colorScheme="gray"
                    borderStartRadius={["md", "none"]}
                    mt={["10px", "0px"]}
                  >
                    חפש
                  </Button>
                </Flex>
              </Flex>
            </form>
          </Flex>
        </Flex>
        <Flex overflow="hidden" justifyContent="center">
          <BooksTables books={searchResult || books} />
        </Flex>
      </FormikProvider>
    </>
  );
}
