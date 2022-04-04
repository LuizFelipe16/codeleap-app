import { Heading, useToast, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { useMutation } from 'react-query';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as validateYup from 'yup';

import { useUser } from "../../hooks/useUser";

import { Button } from "../Button";
import { Input } from "../Input";
import { Textarea } from "../Input/Textarea";

import { queryClient } from "../../services/queryClient";
import { api } from "../../services/api";

type CreatePostFormData = {
  title: string;
  content: string;
}

const createPostFormSchema = validateYup.object().shape({
  title: validateYup.string().required("Title is required").min(3, 'Mínimo 3 caracteres'),
  content: validateYup.string().required("Content is required"),
});

export function FormCreatePost() {
  const toast = useToast();
  const { user } = useUser();

  const {
    register,
    reset,
    formState,
    handleSubmit
  } = useForm<CreatePostFormData>({
    resolver: yupResolver(createPostFormSchema)
  });

  const errors = formState.errors;

  const createPost = useMutation(async (data: CreatePostFormData) => {
    await api.post('/', {
      username: user.username,
      ...data
    });
  }, {
    onSuccess: () => {
      toast({
        position: "bottom",
        title: 'Post Created',
        status: 'success',
        duration: 3000,
        isClosable: true
      });
      queryClient.invalidateQueries('posts');
      reset();
    },
    onError: () => {
      toast({
        position: "bottom",
        title: 'Error Post',
        description: 'An error occurred while trying to create the post, please try again.',
        status: 'error',
        duration: 3000,
        isClosable: true
      });
    }
  });

  const handleCreatePost: SubmitHandler<CreatePostFormData> = async (values) => {
    if (!user.username) {
      toast({
        position: "bottom",
        title: 'Login not found',
        description: 'Login again and enter your username correctly.',
        status: 'error',
        duration: 3000,
        isClosable: true
      });

      return;
    }

    await createPost.mutateAsync(values);
  }

  return (
    <VStack
      as="form"
      onSubmit={handleSubmit(handleCreatePost)}
      data-aos="fade-down"
      w={["93%", "85%", "65%"]}
      h="auto"
      bg="white"
      p="6"
      align="flex-start"
      justify="space-between"
      borderRadius="lg"
      boxShadow="lg"
      mt="-32"
      spacing="5"
    >
      <Heading fontSize="lg">What's on your mind?</Heading>
      <Input
        is="title"
        label="Title"
        placeholder="Hellow world"
        error={errors.title}
        {...register('title')}
      />
      <Textarea
        is="content"
        label="Content"
        placeholder="Content here"
        error={errors.content}
        {...register('content')}
      />

      <Button isLoading={createPost.isLoading} type="submit" text="CREATE" />
    </VStack>
  );
}