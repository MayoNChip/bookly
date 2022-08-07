import { Button, Divider, Flex, Heading } from "@chakra-ui/react";

export default function Navbar() {
  return (
    <Flex
      w="100vw"
      h="70px"
      bg="gray.500"
      justifyContent="space-between"
      alignItems="center"
      shadow="base"
    >
      <Flex w={["50%", "20%"]} h="100%" alignItems="center">
        <Heading mx="10px">לוגו</Heading>
        <Divider h="75%" orientation="vertical" />
        <Heading textColor="gray.800" mx="10px" fontSize={["lg", "2xl"]}>
          ישיבת כך וכך
        </Heading>
      </Flex>
      <Button colorScheme="gray" mx="20px">
        מנהל
      </Button>
    </Flex>
  );
}
