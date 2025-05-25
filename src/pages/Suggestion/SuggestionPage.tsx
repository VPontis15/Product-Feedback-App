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

interface SuggestionData {
  id: string;
  title: string;
  description: string;
  slug: string;
  category: { category: string };
  status: { update_status: string };
  comment: { count: number }[];
  upvotes: number;
  created_at: string;
}

const StyledSuggestionPage = styled.main`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  align-self: start;
  max-width: min(775px, 90%);
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
          .from('feedback_with_comment_count')
          .select(
            `
          *,
          category!inner(category),
          status!inner(update_status)
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
        <Suggestion
          isLoading={true}
          suggestion={{
            id: '',
            title: '',
            description: '',
            slug: '',
            category: { category: '' },
            status: { update_status: '' },
            comment: [{ count: 0 }],
            upvotes: 0,
          }}
        />
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
      <Suggestion
        isSuggestionPage
        isLoading={false}
        suggestion={suggestionData}
      />
      <Suspense fallback={<Loader />}>
        <CommentSection suggestionId={suggestionData.id} />
      </Suspense>
      <CommentForm slug={slug as string} />
    </StyledSuggestionPage>
  );
}
