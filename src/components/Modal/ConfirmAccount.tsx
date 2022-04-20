import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  Button,
  VStack,
  ModalBody,
  Input as CInput,
  useToast,
  HStack
} from '@chakra-ui/react';
import { FormEvent, useState } from 'react';
import { useUser } from '../../hooks/useUser';

import { api_next } from '../../services/api';
import { options } from '../../utils/toast';

interface IConfirmAccountProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ModalConfirmAccount({ isOpen, onClose }: IConfirmAccountProps) {
  const { user, setIsAccountConfirm } = useUser();
  const toast = useToast();

  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleConfirmAccountOfUser(e: FormEvent) {
    e.preventDefault();
    setIsLoading(true);

    const data = {
      email: user.decode.email,
      password
    }

    const response = await api_next.post('/users/confirmAccount', data);

    if (response.data?.error) {
      toast({ position: 'top', title: response.data?.error, status: 'error', ...options });
      setIsLoading(false);
      return;
    }

    if (response.data?.message) {
      toast({ position: 'top', title: response.data?.message, status: 'success', ...options });

      const isAccountConfirm = response.data?.isAccountConfirm;

      setIsAccountConfirm(isAccountConfirm);
      setIsLoading(false);
      setPassword("");
      onClose();

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
    <Modal isCentered size="lg" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay bg="#777777CC" />
      <ModalContent w={["95%", "95%", ""]}>
        <ModalHeader color="black">Confirm your account</ModalHeader>
        <ModalBody>
          <VStack
            as="form"
            onSubmit={handleConfirmAccountOfUser}
            align="flex-start"
            justify="space-between"
            spacing="5"
            pb="3"
          >
            <CInput
              id="password"
              type="password"
              name="password"
              focusBorderColor="gray.400"
              variant="filled"
              borderRadius={4}
              p="5"
              fontSize="sm"
              placeholder="digit your password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />

            <HStack mt="4" spacing="2" alignSelf="flex-end">
              <Button
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
                type="submit"
                isLoading={isLoading}
                size="md"
                fontWeight="500"
                bg="black"
                color="white"
                transition="0.2s"
                _hover={{ filter: 'brightness(70%)' }}
              >
                Confirm
              </Button>
            </HStack>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}