import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button
} from '@chakra-ui/react';
import { ReactNode } from 'react';

interface IModalDeletePostProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ModalDeletePost({ isOpen, onClose }: IModalDeletePostProps) {
  return (
    <Modal isCentered size="lg" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay bg="#777777CC" />
      <ModalContent>
        <ModalHeader color="black">Are you sure you want to delete this item?</ModalHeader>
        <ModalFooter>
          <Button
            mr={3}
            onClick={onClose}
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