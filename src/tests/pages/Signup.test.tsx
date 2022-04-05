import { render, screen } from '@testing-library/react';
import { mocked } from 'jest-mock';
import Signup from '../../pages';
import { useUser } from '../../hooks/useUser';

jest.mock('../../actions/withSSRGuest');

describe('Signup page', () => {
  it('renders correctly', () => {
    const useUserMocked = mocked(useUser);

    render(<Signup />);

    expect(screen.getByText("CodeLeap.")).toBeInTheDocument();
  });
});