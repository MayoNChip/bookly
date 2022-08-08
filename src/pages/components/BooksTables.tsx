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
          <Th>מוציא לאור</Th>
        </Tr>
      </Thead>
      <Tbody>
        {books &&
          books.map((book) => {
            return (
              <Tr key={book.id}>
                <Td>{book.bookShelf}</Td>
                <Td>{book.bookName}</Td>
                <Td>{book.bookCatagory}</Td>
                <Td>{book.bookPublisher}</Td>
              </Tr>
            );
          })}
      </Tbody>
    </Table>
  );
}
