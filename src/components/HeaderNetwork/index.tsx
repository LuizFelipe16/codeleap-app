import { useState } from "react";
import { useRouter } from "next/router";
import { Flex, Heading, Button as CButton, Icon } from "@chakra-ui/react";
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { BsGear, BsGearFill } from 'react-icons/bs';

import { useUser } from "../../hooks/useUser";

import { MenuContentStyled, MenuItemStyled } from "./styles";

export const HeaderNetwork = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { signOut } = useUser();

  return (
    <>
      <Flex
        w="100%"
        h="15rem"
        bg="black"
        p="6"
        justify="center"
      >
        <Heading w="auto" fontWeight="700" fontSize="1.6rem" color="white">CodeLeap Network</Heading>

        <DropdownMenu.Root open={isMenuOpen} onOpenChange={() => setIsMenuOpen(!isMenuOpen)}>
          <DropdownMenu.Trigger asChild>
            <CButton
              onClick={signOut}
              bg="transparent"
              position="absolute"
              color="white"
              left="14"
              top="6"
              transition="0.3s"
              _hover={{ filter: 'brightness(60%)', }}
            >
              {!!isMenuOpen ? (
                <Icon fontSize="xl" as={BsGear} aria-label="Menu" />
              ) : (
                <Icon fontSize="xl" as={BsGearFill} aria-label="Menu" />
              )}
            </CButton>
          </DropdownMenu.Trigger>

          <MenuContentStyled sideOffset={5}>
            <MenuItemStyled onClick={() => router.push("/account")}>account</MenuItemStyled>
            <MenuItemStyled onClick={signOut}>sign out</MenuItemStyled>
          </MenuContentStyled>
        </DropdownMenu.Root>
      </Flex>
    </>
  );
}