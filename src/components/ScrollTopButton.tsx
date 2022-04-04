import { Button, Icon } from "@chakra-ui/react";
import { FaArrowUp } from 'react-icons/fa';
import { animateScroll } from 'react-scroll';

export function ScrollTopButton() {
  return (
    <Button
      onClick={() => animateScroll.scrollToTop({ duration: 1000 })}
      bgColor="black"
      color="white"

      position="fixed"
      bottom="10"
      right="10"

      boxShadow="lg"
      borderRadius="lg"

      zIndex="100"
      transition="0.4s"

      _hover={{
        bgColor: 'white',
        color: 'black'
      }}
    >
      <Icon as={FaArrowUp} />
    </Button>
  );
}