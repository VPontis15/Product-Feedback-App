import styled from 'styled-components';
import NoSuggestions from './components/NoSuggestions';
import SuggestionsHeader from './components/SuggestionsHeader';
import Suggestion from './components/Suggestion';
import { useQuery } from '@tanstack/react-query';
import supabase from '../../api/supabase';
import ErrorMessage from '../../components/ErrorMessage';

const Main = styled.main`
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 1.5rem;
  position: relative;
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

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  position: absolute;
  top: 0;
  width: 100%;
  font-size: var(--fs-lg);
  color: var(--color-dark-blue);
  background-color: var(--color-orange);
  border-radius: var(--btn-radius);
  padding: 2rem;

  .loader {
    width: 60px;
    height: 50px;
    --m: no-repeat
      linear-gradient(90deg, var(--color-purple) 70%, transparent 0);
    -webkit-mask: var(--m) calc(0 * 100% / 4) 100% / calc(100% / 5)
        calc(1 * 100% / 5),
      var(--m) calc(1 * 100% / 4) 100% / calc(100% / 5) calc(2 * 100% / 5),
      var(--m) calc(2 * 100% / 4) 100% / calc(100% / 5) calc(3 * 100% / 5),
      var(--m) calc(3 * 100% / 4) 100% / calc(100% / 5) calc(4 * 100% / 5),
      var(--m) calc(4 * 100% / 4) 100% / calc(100% / 5) calc(5 * 100% / 5);
    background: linear-gradient(var(--color-purple) 0 0) left/0% 100% no-repeat
      #ddd;
    animation: l14 2s infinite steps(6);
  }
  @keyframes l14 {
    100% {
      background-size: 120% 100%;
    }
  }
`;

const ErrorWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  position: absolute;
  top: 0;
  width: 100%;
  background-color: var(--color-white);
  border-radius: var(--btn-radius);
  padding: 2rem;
`;

export default function Suggestions() {
  const {
    data: suggestions,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['suggestions'],
    queryFn: async () => {
      try {
        // Get feedback with category, status, and count comments for each feedback
        const { data: suggestions, error } = await supabase.from('feedback')
          .select(`
          *,
          category(category),
          status(update_status),
          comment(count)
        `);

        if (error) {
          throw new Error(error.message);
        }

        return suggestions;
      } catch (error) {
        console.error('Error fetching suggestions:', error);
        throw error; // Re-throw to show in UI
      }
    },
  });
  const count = suggestions?.length || 0;
  return (
    <Main>
      <SuggestionsHeader count={count} />
      {isLoading ? (
        <LoadingWrapper>
          <div className="loader"></div>
        </LoadingWrapper>
      ) : error ? (
        <ErrorWrapper>
          <ErrorMessage
            message={
              error instanceof Error ? error.message : 'An error occurred'
            }
          />
        </ErrorWrapper>
      ) : suggestions?.length ? (
        <SuggestionsWrapper>
          {suggestions.map((suggestion) => (
            <Suggestion key={suggestion.id} suggestion={suggestion} />
          ))}
        </SuggestionsWrapper>
      ) : (
        <NoSuggestions />
      )}
    </Main>
  );
}
