import { lazy, Suspense } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';
import styled from 'styled-components';
import supabase from '../../api/supabase';
import Header from './components/Header';
import Suggestion from '../Home/components/Suggestion';
const CommentSection = lazy(() => import('./components/CommentSection'));
import CommentForm from './components/CommentForm';
import Loader from '../../components/Loader';

const StyledSuggestionPage = styled.main`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  align-self: start;
  max-width: min(775px, 95%);
  margin-inline: auto;
  min-height: 100svh;
  padding-block-start: 5rem;
  padding-block-end: 8rem;
    }`;

export default function SuggestionPage() {
  const { slug } = useParams();
  const {
    data: suggestionData,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['suggestion', slug],
    queryFn: async () => {
      try {
        const { data: suggestion, error } = await supabase
          .from('feedback')
          .select(
            `
          *,
          category(category),
          status(update_status),
          comment(count)
        `
          )
          .eq('slug', slug)
          .single();
        if (error) {
          throw new Error(error.message);
        }
        return suggestion;
      } catch (error) {
        console.error('Error fetching suggestion:', error);
        throw error; // Re-throw to let React Query handle it
      }
    },
  });

  if (isLoading) {
    return (
      <StyledSuggestionPage>
        <Header />
        <Suggestion isLoading={true} suggestion={{} as any} />
        {/* Don't render CommentSection during loading or pass a safe default */}
      </StyledSuggestionPage>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!suggestionData) {
    return <div>Suggestion not found</div>;
  }

  return (
    <StyledSuggestionPage>
      <Header />
      <Suggestion isLoading={false} suggestion={suggestionData} />
      <Suspense fallback={<Loader />}>
        <CommentSection suggestionId={suggestionData.id} />
      </Suspense>
      <CommentForm />
    </StyledSuggestionPage>
  );
}
