import { render, screen } from '@testing-library/react';
import { Loading } from '../../components/Loading';

describe('Loading component', () => {
  it('renders correctly', () => {
    render(
      <Loading />
    );

    expect(screen.getByText('wait a momment, loading...')).toBeInTheDocument();
  });
});
