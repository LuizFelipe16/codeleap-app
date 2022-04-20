import { Flex, Heading, Button as CButton, Icon } from "@chakra-ui/react";
import { BsGear } from 'react-icons/bs';

import { useUser } from "../../hooks/useUser";

export const HeaderNetwork = () => {
  const { signOut } = useUser();

  return (
    <Flex
      w="100%"
      h="15rem"
      bg="black"
      p="6"
      justify="center"
    >
      <Heading w="auto" fontWeight="700" fontSize="1.6rem" color="white">CodeLeap Network</Heading>
      <CButton
        onClick={signOut}
        bg="transparent"
        position="absolute"
        color="white"
        right="10"
        top="6"
        transition="0.3s"
        _hover={{ filter: 'brightness(60%)', }}
      >
        <Icon fontSize="xl" as={BsGear} />
      </CButton>
    </Flex>
  );
}