import { Button as ChakraButton, ButtonProps } from '@chakra-ui/react';

interface IButtonProps extends ButtonProps {
  text: string;
}

export function Button({ text, ...rest }: IButtonProps) {
  return (
    <ChakraButton
      size="sm"
      bg="black"
      px="8"
      borderRadius="md"
      color="white"
      fontWeight="400"
      transition="0.2s"
      alignSelf="flex-end"
      _hover={{
        bg: 'black',
        filter: 'brightness(60%)',
      }}
      {...rest}
    >
      {text}
    </ChakraButton>
  );
}