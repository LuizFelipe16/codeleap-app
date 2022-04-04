import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Textarea as CTextarea,
  TextareaProps as CTextareaProps
} from "@chakra-ui/react";

import { forwardRef, ForwardRefRenderFunction } from "react";
import { FieldError } from "react-hook-form";

interface ITextareaProps extends CTextareaProps {
  is: string;
  label?: string;
  error?: FieldError;
}

const TextareaBase: ForwardRefRenderFunction<HTMLTextAreaElement, ITextareaProps>
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

        <CTextarea
          id={is}
          name={is}
          focusBorderColor="gray.400"
          variant="filled"
          borderRadius={4}
          p="5"
          fontSize="sm"
          size="sm"
          ref={ref}
          {...rest}
        />

        {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
      </FormControl>
    );
  }

export const Textarea = forwardRef(TextareaBase);