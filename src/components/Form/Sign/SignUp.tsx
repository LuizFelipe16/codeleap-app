import { Stack } from '@chakra-ui/react';
import { MouseEventHandler } from 'react';

import { Sign } from '.';
import { Input } from '../../Input';

interface ISignUpProps {
  onClickAlreadyHaveAccount: MouseEventHandler<HTMLParagraphElement>;
}

export const SignUp = ({ onClickAlreadyHaveAccount }: ISignUpProps) => {
  return (
    <Sign
      title="Create an account on the CodeLeap network!"
      description="Please fill in all the fields below properly"
      buttonText="sign up"
      onSubmitForm={() => console.log("submit")}
      subtitle="already have an account? begin session"
      onClick={onClickAlreadyHaveAccount}
    >
      <Input
        is="username"
        placeholder="Username"
      />

      <Input
        type="email"
        is="email"
        placeholder="E-mail"
      />

      <Stack direction={["column", "row", "row"]} w="100%" spacing="2" justify="space-between">
        <Input
          type="password"
          is="password"
          placeholder="Password"
        />
        <Input
          type="password"
          is="confirm_password"
          placeholder="Confirm Password"
        />
      </Stack>
    </Sign>
  );
}