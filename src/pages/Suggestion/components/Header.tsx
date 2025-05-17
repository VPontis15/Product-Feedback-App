import { Link } from 'react-router';
import styled from 'styled-components';
import Button from '../../../components/Button';
import arrowLeft from '../../../assets/shared/icon-arrow-left.svg';
const SuggestionHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;

  a {
    display: inline-flex;
    gap: 0.35rem;

    align-items: center;
    text-decoration: none;
    text-transform: capitalize;
    color: var(--color-dark-gray);
    font-size: var(--fs-sm);
  }
`;
export default function Header() {
  return (
    <SuggestionHeader>
      <Link to="..">
        {' '}
        <img src={arrowLeft} alt="" /> Go back
      </Link>
      <Button variant="secondary" size="sm">
        Edit Feedback
      </Button>
    </SuggestionHeader>
  );
}
