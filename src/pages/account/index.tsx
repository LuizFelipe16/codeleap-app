import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Flex, VStack, useDisclosure, HStack, Heading, Button as CButton } from '@chakra-ui/react';

import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as validateYup from 'yup';

import { ModalConfirmAccount } from '../../components/Modal/ConfirmAccount';
import { Input } from '../../components/Input';

import { useUser } from '../../hooks/useUser';
import { withSSRAuth } from '../../actions/withSSRAuth';

type AccountFormData = {
  username: string;
  email: string;
}

const accountFormSchema = validateYup.object().shape({
  username: validateYup.string().required("Username is required").min(3, 'Minimum of 3 characters'),
  email: validateYup.string().email("Invalid e-mail").required("E-mail is required")
});

export default function Account() {
  const router = useRouter();
  const { user } = useUser();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [isDisabled, setIsDisabled] = useState(true);

  const {
    register,
    reset,
    formState,
    handleSubmit
  } = useForm<AccountFormData>({
    resolver: yupResolver(accountFormSchema)
  });

  const errors = formState.errors;

  return (
    <>
      <Head><title>Account | CodeLeap</title></Head>
      <Flex
        w="100vw"
        minH="100vh"
        bg="bg.100"
        align="center"
        justify="center"
      >
        <VStack
          as="form"
          data-aos="fade-down"
          w={["93%", "85%", "50%"]}
          h="auto"
          bg="white"
          p="6"
          align="flex-start"
          justify="space-between"
          borderRadius="lg"
          boxShadow="lg"
          spacing="5"
        >
          <Heading fontSize="xl">Account</Heading>
          <Input
            is="username"
            label="Username"
            placeholder="digit your username"
            error={errors.username}
            {...register('username', { value: user.decode.username })}
            isDisabled={isDisabled}
          />
          <Input
            is="email"
            label="E-mail"
            placeholder="digit your e-mail"
            error={errors.email}
            {...register('email', { value: user.decode.email })}
            isDisabled={isDisabled}
          />

          <br />

          <HStack spacing="4" alignSelf="flex-end">
            <CButton
              onClick={() => router.push("/network")}
              size="md"
              fontWeight="500"
              bg="black"
              color="white"
              transition="0.2s"
              _hover={{ filter: 'brightness(70%)' }}
            >
              Return to network
            </CButton>
            <CButton
              onClick={onOpen}
              size="md"
              fontWeight="500"
              bg="black"
              color="white"
              transition="0.2s"
              _hover={{ filter: 'brightness(70%)' }}
            >
              Edit
            </CButton>
          </HStack>
        </VStack>
      </Flex>

      <ModalConfirmAccount
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  return {
    props: {}
  }
});