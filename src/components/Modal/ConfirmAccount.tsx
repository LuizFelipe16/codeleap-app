import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  Button,
  VStack,
  ModalBody,
} from '@chakra-ui/react';

import { Input } from '../Input';

interface IConfirmAccountProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ModalConfirmAccount({ isOpen, onClose }: IConfirmAccountProps) {
  return (
    <Modal isCentered size="lg" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay bg="#777777CC" />
      <ModalContent w={["95%", "95%", ""]}>
        <ModalHeader color="black">Confirm your account</ModalHeader>
        <ModalBody>
          <VStack
            as="form"
            align="flex-start"
            justify="space-between"
            spacing="5"
            pb="3"
          >
            <Input
              is="password"
              type="password"
              label="Your Password"
              placeholder="digit your password"
            />
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button
            onClick={onClose}
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
            size="md"
            fontWeight="500"
            bg="black"
            color="white"
            transition="0.2s"
            _hover={{ filter: 'brightness(70%)' }}
          >
            Confirm
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}