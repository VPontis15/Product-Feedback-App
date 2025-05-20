import { Link } from 'react-router';
import arrowLeft from '../assets/shared/icon-arrow-left.svg';
import styled from 'styled-components';

const StyledGoBackBtn = styled(Link)`
  display: inline-flex;
  gap: 0.35rem;
  align-items: center;
  text-decoration: none;
  text-transform: capitalize;
  color: var(--color-dark-gray);
  font-size: var(--fs-sm);
`;

export default function GoBackBtn() {
  return (
    <StyledGoBackBtn to="..">
      <img src={arrowLeft} alt="" />
      <span>Go back</span>
    </StyledGoBackBtn>
  );
}
