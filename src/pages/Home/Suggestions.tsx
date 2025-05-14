import styled from 'styled-components';
import NoSuggestions from './components/NoSuggestions';
import SuggestionsHeader from './components/SuggestionsHeader';

const Main = styled.main`
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 1.5rem;
`;

export default function Suggestions() {
  return (
    <Main>
      <SuggestionsHeader />
      <NoSuggestions />
    </Main>
  );
}
