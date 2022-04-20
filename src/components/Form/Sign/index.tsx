import { MouseEventHandler, ReactNode } from "react";
import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";

interface ISignProps {
  title: string;
  description?: string;
  children: ReactNode;

  subtitle: string;
  onClick: MouseEventHandler<HTMLParagraphElement>;

  buttonText: string;
  onSubmitForm: any;

  isLoading: boolean;
  isLoadingSecond?: boolean;
}

export const Sign = (
  {
    title,
    children,
    onSubmitForm,
    buttonText,
    onClick,
    subtitle,
    description,
    isLoading,
    isLoadingSecond
  }: ISignProps
) => (
  <Flex
    w={["100%", "100%", "51%"]}
    h="100%"
    align="center"
    justify="center"
  >
    <Flex
      // data-aos="zoom-in"
      // data-aos-duration="1000"
      as="form"
      onSubmit={onSubmitForm}
      w={["90%", "90%", "85%"]}
      mt={["-25rem", "-20rem", "0"]}
      zIndex="10"
      h="auto"
      minH="14rem"
      bg="white"
      p="6"
      boxShadow="md"
      borderRadius="lg"
      direction="column"
      align="flex-start"
      gap="1.2rem"
    >
      <Box>
        <Heading fontSize="lg" mb="3">{title}</Heading>
        <Text fontSize="md">{description}</Text>
      </Box>

      {children}

      <Button
        type="submit"
        isLoading={isLoading}
        marginTop="1.2rem"
        w="100%"
        size="md"
        bgColor="black"
        color="white"
        fontWeight="400"
        transition="0.2s"
        _hover={{
          filter: "brightness(70%)"
        }}
      >
        {buttonText}
      </Button>

      <Text
        as="button"
        onClick={onClick}
        mt="2"
        textDecoration="underline"
        fontSize="md"
        fontWeight="400"
        alignSelf="flex-end"
        cursor="pointer"
        _hover={{ textDecoration: 'none' }}
      >
        {subtitle}
      </Text>
    </Flex>
  </Flex>
);