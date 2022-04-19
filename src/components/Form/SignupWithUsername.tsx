import { useState } from 'react';
import { Box, Flex, Heading, Input, Text, VStack } from '@chakra-ui/react';

import { useUser } from '../../hooks/useUser';
import { Button } from '../Button';

import commonStyles from '../../styles/pages/common.module.scss';

export const SignUpWithUsername = () => {
  const { signIn, isLoading } = useUser();

  const [username, setUsername] = useState("");

  const handleSignUp = (): void => signIn(username);

  return (
    <Flex
      w={["100%", "100%", "51%"]}
      h="100%"
      align="center"
      justify="center"
    >
      <VStack
        data-aos="zoom-in"
        data-aos-duration="1500"
        w={["90%", "90%", "85%"]}
        mt={["-25rem", "-20rem", "0"]}
        zIndex="10"
        h="auto"
        minH="14rem"
        bg="white"
        p="6"
        boxShadow="md"
        borderRadius="lg"
        align="flex-start"
        justify="space-between"
        spacing="4"
      >
        <Heading fontSize="lg">Welcome to CodeLeap network!</Heading>
        <Box w="100%">
          <Text fontSize="md" mb="2">Please enter your username</Text>
          <Input
            w="100%"
            variant='filled'
            placeholder='username'
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </Box>

        <Button
          onClick={handleSignUp}
          isLoading={isLoading}
          className={`${username.length < 2 && commonStyles.deactivate}`}
          text="ENTER"
        />
      </VStack>
    </Flex>
  );
}