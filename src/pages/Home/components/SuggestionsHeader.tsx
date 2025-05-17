import styled from 'styled-components';
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

  div {
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }

  img {
    width: 1.5rem;
    height: 1.5rem;
    margin-inline-end: 1rem;
  }
  div + form {
    margin-inline: 2.125rem;
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
  select {
    background: none;
    color: var(--color-white);
    border: none;
    font-weight: 700;
  }
`;
export default function SuggestionsHeader({ count }: { count: number }) {
  return (
    <StyledSuggestionsHeader>
      <div>
        <div>
          <img src={suggestionsIcon} alt="" />
          <span>{count}</span>
          <h2>Suggestions</h2>
        </div>

        <form action="">
          <label htmlFor="sort_by">Sort by:</label>
          <select id="sort_by">
            <option value="most_upvotes">Most Upvotes</option>
            <option value="least_upvotes">Least Upvotes</option>
            <option value="most_comments">Most Comments</option>
            <option value="least_comments">Least Comments</option>
          </select>
        </form>
      </div>
      <Button variant="primary">+ Add Feedback</Button>
    </StyledSuggestionsHeader>
  );
}
