import styled from 'styled-components';
import GoBackBtn from '../../../components/GoBackBtn';

const StyledHeader = styled.header`
  margin-block-end: 2.5rem;
  display: flex;
  width: 100%;
  margin-inline: auto;
  max-width: 545px;
`;

export default function Header() {
  return (
    <StyledHeader>
      <GoBackBtn />
    </StyledHeader>
  );
}
