import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input as CInput,
  InputProps as CInputProps
} from "@chakra-ui/react";

import { forwardRef, ForwardRefRenderFunction } from "react";
import { FieldError } from "react-hook-form";

interface IInputProps extends CInputProps {
  is: string;
  label?: string;
  error?: FieldError;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, IInputProps>
  = ({ label, is, error = null, ...rest }, ref) => {
    return (
      <FormControl w="100%" isInvalid={!!error}>
        {!!label && (
          <FormLabel
            fontWeight="400"
            color="black"
            htmlFor={is}>
            {label}
          </FormLabel>
        )}

        <CInput
          id={is}
          name={is}
          focusBorderColor="gray.400"
          variant="filled"
          borderRadius={4}
          p="5"
          fontSize="sm"
          ref={ref}
          {...rest}
        />

        {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
      </FormControl>
    );
  }

export const Input = forwardRef(InputBase);