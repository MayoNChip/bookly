import { useToast } from "@chakra-ui/react";

export default function Toast() {
  const toast = useToast();
  const genToast = (
    type: "success" | "error",
    title: string,
    message: string
  ) => {
    toast({
      title,
      description: message,
      status: type,
      duration: 9000,
      containerStyle: {
        display: "flex",
        direction: "rtl",
      },
      isClosable: true,
    });
  };

  return { genToast };
}
