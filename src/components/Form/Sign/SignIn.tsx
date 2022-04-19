import { MouseEventHandler } from 'react';
import { Sign } from '.';
import { Input } from '../../Input';

interface ISignInProps {
  onClickNotHaveAccount: MouseEventHandler<HTMLParagraphElement>;
}

export const SignIn = ({ onClickNotHaveAccount }: ISignInProps) => {
  return (
    <Sign
      title="Welcome to CodeLeap network!"
      buttonText="sign in"
      onSubmitForm={() => console.log("submit")}
      subtitle="not have an account yet?"
      onClick={onClickNotHaveAccount}
    >
      <Input
        type="email"
        is="email"
        label="Your e-mail"
        placeholder="e-mail"
      />
      <Input
        type="password"
        is="password"
        label="Your password"
        placeholder="password"
      />
    </Sign>
  );
}