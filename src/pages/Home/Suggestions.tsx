import styled from 'styled-components';
import NoSuggestions from './components/NoSuggestions';
import SuggestionsHeader, {
  SORT_OPTIONS,
  type SortOptionValue,
} from './components/SuggestionsHeader';
import Suggestion from './components/Suggestion';
import { useQuery } from '@tanstack/react-query';
import supabase from '../../api/supabase';
import ErrorMessage from '../../components/ErrorMessage';
import Loader from '../../components/Loader';
import { useState, useMemo } from 'react';
import { useFiltersContext } from '../../context/filtersContext';

const Main = styled.main`
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 1.5rem;
  position: relative;

  @media (max-width: 650px) {
    padding-block-end: 2rem;
    gap: 0;
    margin-inline: auto;
    width: 100%;
  }
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

  @media (max-width: 650px) {
    max-width: min(1440px, 90%);
    margin-inline: auto;
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
  const [sortBy, setSortBy] = useState<SortOptionValue>(SORT_OPTIONS[0].value);
  const { filter } = useFiltersContext();
  // Use the query to fetch ALL data once
  const {
    data: allSuggestions,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['suggestions'],
    queryFn: async () => {
      // Fetch all suggestions without any specific order
      const { data, error } = await supabase
        .from('feedback_with_comments_and_likes')
        .select(
          `
          *,
          category!inner(category),
          status!inner(update_status)
        `
        )
        .eq('status.update_status', 'Suggestion');

      if (error) throw new Error(error.message);
      return data || [];
    },
    staleTime: 60 * 1000, // Cache for 1 minute
    refetchOnWindowFocus: false,
  });

  // Filter and sort suggestions
  const suggestions = useMemo(() => {
    if (!allSuggestions) return [];

    // First, filter by category
    let filtered = allSuggestions;
    if (filter !== 'All') {
      filtered = allSuggestions.filter(
        (suggestion) => suggestion.category.category === filter
      );
    }

    // Then, sort the filtered results
    const currentSortOption =
      SORT_OPTIONS.find((option) => option.value === sortBy) || SORT_OPTIONS[0];
    return [...filtered].sort((a, b) => {
      if (currentSortOption.column === 'like_count') {
        const aLikes = a.like_count || 0;
        const bLikes = b.like_count || 0;
        return currentSortOption.order === 'asc'
          ? aLikes - bLikes
          : bLikes - aLikes;
      } else if (currentSortOption.column === 'comment_count') {
        const aComments = a.comment_count || 0;
        const bComments = b.comment_count || 0;
        return currentSortOption.order === 'asc'
          ? aComments - bComments
          : bComments - aComments;
      }
      return 0;
    });
  }, [allSuggestions, filter, sortBy]);

  const count = suggestions?.length || 0;
  return (
    <Main>
      <SuggestionsHeader
        count={count}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />
      {isLoading ? (
        <Loader fullscreen />
      ) : error ? (
        <ErrorWrapper>
          <ErrorMessage>
            {error instanceof Error
              ? error.message
              : 'An error occurred while fetching suggestions'}
          </ErrorMessage>
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
