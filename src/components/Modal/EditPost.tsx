import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  Box,
  Textarea,
  Text
} from '@chakra-ui/react';
import { ReactNode } from 'react';

import commonStyles from '../../styles/pages/common.module.scss';

interface IModalEditPostProps {
  isOpen: boolean;
  onClose: () => void;

  children?: ReactNode;
}

export function ModalEditPost({ isOpen, onClose }: IModalEditPostProps) {
  return (
    <Modal isCentered size="lg" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay bg="#777777CC" />
      <ModalContent>
        <ModalHeader color="black">Edit item</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box w="100%">
            <Text fontSize="md" mb="2">Title</Text>
            <Input
              w="100%"
              variant='filled'
              placeholder='Hello world'
            />
          </Box>
          <Box w="100%">
            <Text fontSize="md" mb="2">Content</Text>
            <Textarea
              w="100%"
              variant='filled'
              size="sm"
              placeholder='Content here'
            />
          </Box>


        </ModalBody>
        <ModalFooter>
          <button
            className={`
              ${commonStyles.bottom} 
            `}
          >
            SAVE
          </button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}