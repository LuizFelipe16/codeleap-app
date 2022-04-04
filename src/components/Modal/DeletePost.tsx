import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  Button,
  useToast
} from '@chakra-ui/react';
import { useMutation } from 'react-query';
import { api } from '../../services/api';
import { queryClient } from '../../services/queryClient';
import { options } from '../../utils/toast';

interface IModalDeletePostProps {
  isOpen: boolean;
  onClose: () => void;

  id: number;
}

export function ModalDeletePost({ isOpen, onClose, id }: IModalDeletePostProps) {
  const toast = useToast();

  const deletePost = useMutation(async (id: number) => {
    await api.delete(`/${id}/`);
  }, {
    onSuccess: () => {
      toast({
        position: "top",
        title: 'Post Deleted',
        status: 'success',
        ...options
      });
      queryClient.invalidateQueries('posts');
    },
    onError: () => {
      toast({
        position: "top",
        title: 'Error Delete',
        description: 'An error occurred while trying to delete the post, please try again.',
        status: 'error',
        ...options
      });
    }
  });

  const handleDeletePost = async () => await deletePost.mutateAsync(id);

  return (
    <Modal isCentered size="lg" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay bg="#777777CC" />
      <ModalContent w={["95%", "95%", ""]}>
        <ModalHeader color="black">Are you sure you want to delete this item?</ModalHeader>
        <ModalFooter>
          <Button
            onClick={onClose}
            isLoading={deletePost.isLoading}
            mr={3}
            fontWeight="700"
            bg="white"
            borderWidth={1}
            borderColor="black"
            color="black"
            _hover={{
              color: 'white',
              bg: 'black'
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDeletePost}
            isLoading={deletePost.isLoading}
            fontWeight="700"
            bg="white"
            borderWidth={1}
            borderColor="black"
            color="black"
            _hover={{
              color: 'white',
              bg: 'black'
            }}
          >
            OK
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}