import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useToast,
  VStack
} from '@chakra-ui/react';
import { ReactNode } from 'react';
import { useMutation } from 'react-query';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as validateYup from 'yup';

import { Button } from '../Button';

import { api } from '../../services/api';
import { queryClient } from '../../services/queryClient';
import { Input } from '../Input';
import { Textarea } from '../Input/Textarea';

type Post = {
  id: number;
  title: string;
  content: string;
}

interface IModalEditPostProps {
  isOpen: boolean;
  onClose: () => void;
  post: Post;

  children?: ReactNode;
}

type UpdatePostFormData = {
  title: string;
  content: string;
}

const updatePostFormSchema = validateYup.object().shape({
  title: validateYup.string().required("Title is required").min(3, 'Mínimo 3 caracteres'),
  content: validateYup.string().required("Content is required"),
});

export function ModalEditPost({ isOpen, onClose, post }: IModalEditPostProps) {
  const toast = useToast();
  const {
    register,
    reset,
    formState,
    handleSubmit
  } = useForm<UpdatePostFormData>({
    resolver: yupResolver(updatePostFormSchema)
  });

  const errors = formState.errors;

  const updatePost = useMutation(async (data: UpdatePostFormData) => {
    await api.patch(`/${post.id}/`, {
      ...data
    });
  }, {
    onSuccess: () => {
      toast({
        position: "top",
        title: 'Post Updated',
        status: 'success',
        duration: 3000,
        isClosable: true
      });
      queryClient.invalidateQueries('posts');
      reset();
      onClose();
    },
    onError: () => {
      toast({
        position: "top",
        title: 'Error Post',
        description: 'An error occurred while trying to update the post, please try again.',
        status: 'error',
        duration: 3000,
        isClosable: true
      });
    }
  });

  const handleUpdatePost: SubmitHandler<UpdatePostFormData> = async (values) => {
    await updatePost.mutateAsync(values);
  }

  return (
    <Modal isCentered size="lg" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay bg="#777777CC" />
      <ModalContent w={["95%", "95%", ""]}>
        <ModalHeader color="black">Update item</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack
            as="form"
            onSubmit={handleSubmit(handleUpdatePost)}
            align="flex-start"
            justify="space-between"
            spacing="5"
            pb="3"
          >
            <Input
              is="title"
              label="Title"
              placeholder={post.title}
              error={errors.title}
              {...register('title', { value: post.title })}
            />
            <Textarea
              is="content"
              label="Content"
              placeholder={post.content}
              error={errors.content}
              {...register('content', { value: post.content })}
            />

            <Button isLoading={updatePost.isLoading} type="submit" text="SAVE" />
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}