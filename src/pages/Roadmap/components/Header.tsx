import styled from 'styled-components';
import Button from '../../../components/Button';
import GoBackBtn from '../../../components/GoBackBtn';

const HeaderWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  background-color: var(--color-dark-blue);
  border-radius: var(--btn-radius);
  box-shadow: var(--box-shadow);

  h1 {
    font-size: var(--fs-xxl);
    color: var(--color-white);
    font-weight: 700;
    line-height: var(--line-heading);
  }

  a {
    color: var(--color-white);
    gap: 6px;
  }

  @media (max-width: 650px) {
    padding-inline: 1.5rem;
    padding-block-start: 1.25rem;
    padding-block-end: 1.5rem;
  }
`;

export default function Header() {
  return (
    <HeaderWrapper>
      <div>
        <GoBackBtn />
        <h1>Roadmap</h1>
      </div>
      <Button variant="primary" to="/feedback/new">
        + Add Feedback
      </Button>
    </HeaderWrapper>
  );
}
