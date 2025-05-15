import styled from 'styled-components';
import NoSuggestions from './components/NoSuggestions';
import SuggestionsHeader from './components/SuggestionsHeader';
import Suggestion from './components/Suggestion';

const Main = styled.main`
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 1.5rem;
`;
const SuggestionsWrapper = styled.div`
  max-height: calc(100svh - 10rem);
  overflow-y: auto;
  display: flex;
  scrollbar-color: var(--color-purple) var(--color-white);
  scrollbar-width: 10px;
  flex-direction: column;
  overscroll-behavior-y: unset;
  gap: 1.5rem;
`;
export default function Suggestions() {
  const suggestion = {
    id: '1',
    title: 'Add a dark mode',
    description: 'It would be great to have a dark mode option for the app.',
    category: 'Feature',
    likes: 120,
    comments: 5,
  };

  const length = true;

  return (
    <Main>
      <SuggestionsHeader />
      {length ? (
        <SuggestionsWrapper>
          <Suggestion suggestion={suggestion} />
          <Suggestion suggestion={suggestion} />
          <Suggestion suggestion={suggestion} />
          <Suggestion suggestion={suggestion} />
          <Suggestion suggestion={suggestion} />
          <Suggestion suggestion={suggestion} />
          <Suggestion suggestion={suggestion} />
          <Suggestion suggestion={suggestion} />
          <Suggestion suggestion={suggestion} />
        </SuggestionsWrapper>
      ) : (
        <NoSuggestions />
      )}
    </Main>
  );
}
