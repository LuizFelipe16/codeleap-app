import { MouseEventHandler, useState } from 'react';

import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as validateYup from 'yup';

import { Sign } from '.';
import { Input } from '../../Input';
import { useToast } from '@chakra-ui/react';
import { options } from '../../../utils/toast';
import { api_next } from '../../../services/api';
import { useUser } from '../../../hooks/useUser';

interface ISignInProps {
  onClickNotHaveAccount: MouseEventHandler<HTMLParagraphElement>;
}

type SignInUserFormData = {
  email: string;
  password: string;
}

const signInUserFormSchema = validateYup.object().shape({
  email: validateYup.string().email("Invalid e-mail").required("E-mail is required"),
  password: validateYup.string().required("Password is required"),
});

export const SignIn = ({ onClickNotHaveAccount }: ISignInProps) => {
  const toast = useToast();
  const { signIn, isLoading: isLoadingUser } = useUser();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    reset,
    formState,
    handleSubmit,
  } = useForm<SignInUserFormData>({
    resolver: yupResolver(signInUserFormSchema)
  });

  const errors = formState.errors;

  const handleSignInUser: SubmitHandler<SignInUserFormData> = async (data) => {
    setIsLoading(true);
    const response = await api_next.post('/users/signin', data);

    if (response.data?.error) {
      toast({ position: 'top', title: response.data?.error, status: 'error', ...options });
      setIsLoading(false);
      return;
    }

    if (response.data?.message) {
      toast({ position: 'top', title: response.data?.message, status: 'success', ...options });

      const token = response.data?.token;
      reset();
      signIn({ token });
      setIsLoading(isLoadingUser);

      return;
    }

    toast({
      position: 'top',
      title: 'Unexpected error. Unable to register the user.',
      status: 'error',
      ...options
    });
    setIsLoading(false);
  }

  return (
    <Sign
      title="Welcome to CodeLeap network!"
      buttonText="sign in"
      onSubmitForm={handleSubmit(handleSignInUser)}
      subtitle="not have an account yet?"
      onClick={onClickNotHaveAccount}
      isLoading={isLoading}
    >
      <Input
        type="email"
        is="email"
        label="Your e-mail"
        placeholder="e-mail"
        error={errors.email}
        {...register('email')}
      />

      <Input
        type="password"
        is="password"
        label="Your password"
        placeholder="password"
        error={errors.password}
        {...register('password')}
      />
    </Sign>
  );
}