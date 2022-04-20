import { styled } from '@stitches/react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

export const MenuContentStyled = styled(DropdownMenu.Content, {
  minWidth: 100,
  backgroundColor: 'white',
  borderRadius: 6,
  transition: '0.2s',
  boxShadow:
    'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px'
});

export const MenuItemStyled = styled(DropdownMenu.Item, {
  all: 'unset',
  fontSize: '0.9rem',
  fontWeight: '500',
  lineHeight: 1,
  color: 'black',
  borderRadius: 5,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: 45,
  padding: '0 5px',
  position: 'relative',
  cursor: 'pointer',
  transition: '0.2s',

  '&:focus': {
    backgroundColor: '#ddd',
  },
});