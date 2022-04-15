import { Button } from "@chakra-ui/react"

interface PropsPaginationItem {
  number: number;
  isCurrent?: boolean;
  onPageChange: (page: number) => void;
}

export function PaginationItem({ isCurrent = false, number, onPageChange }: PropsPaginationItem) {
  if (!!isCurrent) {
    return (
      <Button
        size="sm"
        fontSize="xs"
        width="4"
        bg="black"
        borderRadius="md"
        color="white"
        fontWeight="400"
        disabled
        _hover={{
          bg: 'black'
        }}
        _disabled={{
          bg: 'black',
          cursor: 'default'
        }}
      >
        {number}
      </Button>
    )
  }

  return (
    <Button
      size="sm"
      fontSize="xs"
      width="4"
      bg="white"
      borderRadius="md"
      color="black"
      fontWeight="400"
      _hover={{
        bg: 'gray.500'
      }}
      onClick={() => onPageChange(number)}
    >
      {number}
    </Button>
  )

}