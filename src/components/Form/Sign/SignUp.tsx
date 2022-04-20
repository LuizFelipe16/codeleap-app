import { Stack, useToast } from '@chakra-ui/react';
import { MouseEventHandler } from 'react';

import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as validateYup from 'yup';

import { Sign } from '.';
import { Input } from '../../Input';
import { api_next } from '../../../services/api';
import { options } from '../../../utils/toast';

interface ISignUpProps {
  onClickAlreadyHaveAccount: MouseEventHandler<HTMLParagraphElement>;
}

type CreateUserFormData = {
  username: string;
  email: string;
  password: string;
  password_confirmation: string;
}

const createUserFormSchema = validateYup.object().shape({
  username: validateYup.string().required("Username is required").min(3, 'Minimum of 3 characters'),
  email: validateYup.string().email("Invalid e-mail").required("E-mail is required"),
  password: validateYup.string().required("Password is required").min(6, 'Minimum of 6 characters'),
  password_confirmation: validateYup.string().oneOf([
    null,
    validateYup.ref('password')
  ], 'Passwords do not match'),
});

export const SignUp = ({ onClickAlreadyHaveAccount }: ISignUpProps) => {
  const toast = useToast();

  const {
    register,
    reset,
    formState,
    handleSubmit
  } = useForm<CreateUserFormData>({
    resolver: yupResolver(createUserFormSchema)
  });

  const errors = formState.errors;

  const handleRegisterNewUser: SubmitHandler<CreateUserFormData> = async (data) => {
    const response = await api_next.post('/users/signup', data);

    if (response.data?.error) {
      toast({ position: 'top', title: response.data?.error, status: 'error', ...options });
      return;
    }

    if (response.data?.message) {
      reset();
      toast({ position: 'top', title: response.data?.message, status: 'success', ...options });
      onClickAlreadyHaveAccount;

      return;
    }

    toast({
      position: 'top',
      title: 'Unexpected error. Unable to register the user.',
      status: 'error',
      ...options
    });
  }

  return (
    <Sign
      title="Create an account on the CodeLeap network!"
      description="Please fill in all the fields below properly"
      buttonText="sign up"
      onSubmitForm={handleSubmit(handleRegisterNewUser)}
      subtitle="already have an account? begin session"
      onClick={onClickAlreadyHaveAccount}
    >
      <Input
        is="username"
        placeholder="Username"
        error={errors.username}
        {...register('username')}
      />

      <Input
        type="email"
        is="email"
        placeholder="E-mail"
        error={errors.email}
        {...register('email')}
      />

      <Stack direction={["column", "row", "row"]} w="100%" spacing="2" justify="space-between">
        <Input
          type="password"
          is="password"
          placeholder="Password"
          error={errors.password}
          {...register('password')}
        />
        <Input
          type="password"
          is="password_confirmation"
          placeholder="Password Confirm"
          error={errors.password_confirmation}
          {...register('password_confirmation')}
        />
      </Stack>
    </Sign>
  );
}