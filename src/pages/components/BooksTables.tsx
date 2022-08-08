import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { Books } from "@prisma/client";

export default function BooksTables({ books }: { books: Books[] }) {
  console.log(books);
  return (
    <Table mt="20px" variant="striped" colorScheme="gray" size={["sm", "md"]}>
      <Thead>
        <Tr>
          <Th>מספר מדף</Th>
          <Th>שם הספר</Th>
          <Th>קטגוריה</Th>
          <Th>הוצאה לאור</Th>
        </Tr>
      </Thead>
      <Tbody>
        {books &&
          books.map((book) => {
            return (
              <Tr key={book.id}>
                <Td w="10%">{book.bookShelf}</Td>
                <Td w="40%">{book.bookName}</Td>
                <Td w="30%">{book.bookCatagory}</Td>
                <Td w="25%">{book.bookPublisher}</Td>
              </Tr>
            );
          })}
      </Tbody>
    </Table>
  );
}
