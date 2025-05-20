import styled from 'styled-components';
import Select from 'react-select';
import Button from '../../../components/Button';
import suggestionsIcon from '../../../assets/suggestions/icon-suggestions.svg';
const StyledSuggestionsHeader = styled.header`
  display: flex;
  background-color: var(--color-black);
  align-self: start;
  justify-content: space-between;
  color: var(--color-white);
  align-items: center;
  border-radius: var(--btn-radius);
  padding-block: 1.5rem;
  padding-inline: 1.5rem 1rem;
  width: 100%;
  box-shadow: var(--box-shadow);

  @media (max-width: 650px) {
    padding-block: 0.5rem;
    border-radius: 0;
    margin-block-end: 2rem;
    position: sticky;
    max-width: 100%;
  }

  section {
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }

  section > div {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    @media (max-width: 650px) {
      display: none;
    }
  }

  img {
    width: 1.5rem;
    height: 1.5rem;
    margin-inline-end: 1rem;
  }
  div + form {
    margin-inline: 2.125rem;

    @media (max-width: 650px) {
      margin-inline: 0;
    }
  }

  h2 {
    color: var(--color-white);
  }

  h2,
  span {
    font-size: var(--fs-lg);
    line-height: var(--line-heading);
    font-weight: 700;
  }
  form {
    font-size: var(--fs-sm);
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }

  label {
    font-size: var(--fs-xs);
  }
  select {
    background: none;
    color: var(--color-white);
    border: none;
    font-weight: 700;
    font-size: var(--fs-xs);
  }
`;
export default function SuggestionsHeader({ count }: { count: number }) {
  const options = [
    { value: 'most_upvotes', label: 'Most Upvotes' },
    { value: 'least_upvotes', label: 'Least Upvotes' },
    { value: 'most_comments', label: 'Most Comments' },
    { value: 'least_comments', label: 'Least Comments' },
  ];
  return (
    <StyledSuggestionsHeader>
      <section>
        <div>
          <img src={suggestionsIcon} alt="" />
          <span>{count}</span>
          <h2>Suggestions</h2>
        </div>

        <form action="">
          <label htmlFor="sort_by">Sort by:</label>
          <Select
            options={options}
            defaultValue={options[0]}
            isSearchable={false}
            styles={{
              control: (baseStyles) => ({
                ...baseStyles,
                backgroundColor: 'var(--color-black)',
                color: 'var(--color-white)',
                border: 'none',
                boxShadow: 'none',
                fontSize: 'var(--fs-xs)',
                fontWeight: 700,
                cursor: 'pointer',
              }),
              singleValue: (baseStyles) => ({
                ...baseStyles,
                color: 'var(--color-white)',
              }),
              menu: (baseStyles) => ({
                ...baseStyles,
                backgroundColor: 'var(--color-white)',
                color: 'var(--color-black)',
                border: 'none',
                boxShadow: 'none',
              }),
              option: (baseStyles, { isFocused }) => ({
                ...baseStyles,
                backgroundColor: 'none',
                color: isFocused
                  ? 'var(--color-purple-hover)'
                  : 'var(--color-dark-blue)',
                fontSize: 'var(--fs-xs)',
                fontWeight: 700,
                borderBottom: '1px solid var(--color-gray)',
              }),
            }}
          />
        </form>
      </section>
      <Button to="/feedback/new" variant="primary">
        + Add Feedback
      </Button>
    </StyledSuggestionsHeader>
  );
}
