import styled from 'styled-components';
import Button from '../../../components/Button';

const FiltersWrapper = styled.div`
  display: flex;
  gap: 0.8rem;
  align-items: center;
  flex-wrap: wrap;
  margin-inline: auto;
  background-color: var(--color-white);
  border-radius: var(--btn-radius);
  padding-block: 1.5rem;
  padding-inline-start: 1.5rem;
`;

export default function Filters() {
  return (
    <FiltersWrapper>
      <Button isActive variant="filter" size="filter">
        All
      </Button>
      <Button variant="filter" size="filter">
        Ui
      </Button>
      <Button variant="filter" size="filter">
        UX
      </Button>
      <Button variant="filter" size="filter">
        Enhancement
      </Button>
      <Button variant="filter" size="filter">
        Bug
      </Button>
      <Button variant="filter" size="filter">
        Feature
      </Button>
    </FiltersWrapper>
  );
}
