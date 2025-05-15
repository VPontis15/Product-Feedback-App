import styled from 'styled-components';
import emptySuggestions from '../../../assets//suggestions/illustration-empty.svg';
import Button from '../../../components/Button';
const IlluStration = styled.img`
  width: 100%;
  max-width: 136px;
  height: auto;
  margin-block-end: 3.5rem;
`;

const EmptySuggestionContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  color: var(--color-dark-gray);
  background-color: var(--color-white);
  border-radius: var(--btn-radius);
  flex: 1;

  @media (max-width: 768px) {
    padding-block: 7rem;
  }

  h2 {
    color: var(--color-dark-blue);
    font-size: var(--fs-xxl);
  }

  p {
    text-align: center;
    max-width: 50ch;
  }

  p + button {
    margin-block-start: 3rem;
  }
`;
export default function NoSuggestions() {
  return (
    <EmptySuggestionContent>
      <IlluStration
        width={136}
        height={144}
        src={emptySuggestions}
        alt="No suggestions"
      />
      <h2>There is no feedback yet.</h2>
      <p>
        Got a suggestion? Found a bug that needs to be squashed? We love hearing
        about new ideas to improve our app.
      </p>
      <Button variant="primary">+ Add Feedback</Button>
    </EmptySuggestionContent>
  );
}
