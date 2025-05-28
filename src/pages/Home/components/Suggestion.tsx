import styled from 'styled-components';
import arrowUp from '../../../assets/shared/icon-arrow-up.svg';
import Button from '../../../components/Button';
import { Link } from 'react-router';
import Skeleton from '../../../components/Skeleton';
import CommentLogo from '../../../components/CommentLogo';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../../../lib/supabase';
import { useAuth } from '../../../hooks/useAuth';

// Update the interface to match the Supabase response structure
interface SuggestionProps {
  isSuggestionPage?: boolean;
  isLoading?: boolean;
  suggestion: {
    id: string;
    title: string;
    slug: string;
    description: string;
    category: {
      category: string;
    };
    status: {
      update_status: string;
    };
    like_count?: number;
    comment_count?: number;
    comment: [
      {
        count: number;
      }
    ];
  };
}

const SuggestionWrapper = styled.article`
  width: 100%;
  background-color: var(--color-white);
  border-radius: var(--btn-radius);
  padding-block: 1.5rem;
  padding-inline: 1.5rem;
  display: grid;
  grid-template-columns: 2.5rem 1fr 2.5rem;
  gap: 2.5rem;

  @media (max-width: 550px) {
    grid-template-columns: 1fr;
    gap: 0;
  }
`;

const Likes = styled.button`
  display: inline-flex;
  flex-direction: column;
  gap: 0.5rem;
  align-self: start;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: var(--btn-radius);
  background-color: var(--color-like);
  padding-inline: 0.5rem;
  padding-block: 0.5rem 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: var(--color-blue-light);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  span {
    color: var(--color-dark-blue);
    font-size: var(--fs-xs);
    letter-spacing: -0.18px;
    font-weight: 700;
  }

  @media (max-width: 550px) {
    grid-row: 2;
    flex-direction: row;
    justify-self: start;
    width: 4.3125rem;
    vertical-align: middle;
    padding-block: 0.469rem;
    margin-top: 1rem;
  }
`;

const CommentsWrapper = styled.div`
  display: flex;
  items: center;
  gap: 0.5rem;
  align-self: center;
  justify-self: center;
  padding-block-end: 1rem;
  img {
    color: #8594f8;
    background-color: var(--color-white);
    fill: #8594f8;
    width: 1.125rem;
    height: 1rem;
    align-self: center;
    cursor: pointer;
  }

  span {
    color: var(--color-dark-blue);
    font-weight: 700;
    font-size: var(--fs-base);
  }

  @media (max-width: 550px) {
    grid-row: 2;
    margin-top: 1rem;
  }
`;

const SuggestionDetailsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-content: space-between;

  a,
  h1 {
    color: var(--color-dark-blue);
    font-size: var(--fs-lg);
    font-weight: 700;
    text-decoration: none;
  }

  p {
    color: var(--color-dark-gray);
    font-weight: 400;
    line-height: 1.5rem;
    display: block;
    width: 100%;
  }
`;

const SuggestionContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;

  button {
    align-self: flex-start;
    padding-inline: 1.125rem;
  }
`;

const SkeletonTextHeading = styled(Skeleton)`
  height: 1.6rem;
  width: 10rem;

  margin-bottom: 0.5rem;
`;
const SkeletonTextDesc = styled(Skeleton)`
  height: 1rem;
  width: 20rem;

  margin-bottom: 0.5rem;
`;
const SkeletonTextReply = styled(Skeleton)`
  height: 1.5rem;
  width: 1.5rem;
`;

const SkeletonCat = styled(Skeleton)`
  height: 2rem;
  width: 5rem;
  border-radius: var(--btn-radius);
`;

const SkeletonLikes = styled(Skeleton)`
  display: inline-flex;
  flex-direction: column;
  gap: 0.5rem;
  align-self: start;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: var(--btn-radius);
  padding-inline: 0.5.5rem;
  padding-block: 0.5rem 0.5rem;
  cursor: pointer;
  height: 3rem;
`;

export default function Suggestion({
  suggestion,
  isSuggestionPage = false,
  isLoading,
}: SuggestionProps) {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { title, slug, description, category } = suggestion;
  const commentsCount = suggestion.comment_count || 0;
  const likesCount = suggestion.like_count || 0;
  const { data: userLiked = false } = useQuery({
    queryKey: ['userLiked', suggestion.id, user?.id],
    queryFn: async () => {
      if (!user?.id) return false;

      console.log('Checking like status for:', {
        feedback_id: suggestion.id,
        user_id: user.id,
      });

      // First, let's try a simpler query to see if the table is accessible
      const { error: allLikesError } = await supabase
        .from('likes')
        .select('*')
        .limit(1);

      if (allLikesError) {
        console.error('Error accessing likes table:', allLikesError);
        return false;
      }

      const { data: userLiked, error } = await supabase
        .from('likes')
        .select('id')
        .eq('feedback_id', suggestion.id)
        .eq('user_id', user.id)
        .maybeSingle(); // Use maybeSingle instead of single to avoid errors when no rows found

      if (error) {
        console.error('Error fetching user liked status:', error);
        return false;
      }

      return !!userLiked;
    },
    enabled: !!user?.id,
    retry: 1, // Reduce retries to avoid spam
  });
  const likeMutation = useMutation({
    mutationFn: async ({ isLiking }: { isLiking: boolean }) => {
      if (!user?.id) throw new Error('User not authenticated');

      console.log('Like mutation:', {
        isLiking,
        feedback_id: suggestion.id,
        user_id: user.id,
      });

      if (isLiking) {
        const { data, error } = await supabase
          .from('likes')
          .insert({ feedback_id: suggestion.id, user_id: user.id })
          .select();

        if (error) {
          console.error('Insert error:', error);
          throw error;
        }
        console.log('Successfully inserted like:', data);
      } else {
        const { data, error } = await supabase
          .from('likes')
          .delete()
          .eq('feedback_id', suggestion.id)
          .eq('user_id', user.id)
          .select();

        if (error) {
          console.error('Delete error:', error);
          throw error;
        }
        console.log('Successfully deleted like:', data);
      }
    },
    onSuccess: () => {
      console.log('Like mutation successful, invalidating queries...');
      // Invalidate the user liked status
      queryClient.invalidateQueries({
        queryKey: ['userLiked', suggestion.id, user?.id],
      });
      // Invalidate the suggestions list (for home page)
      queryClient.invalidateQueries({ queryKey: ['suggestions'] });
      // Invalidate the individual suggestion query (for suggestion page)
      queryClient.invalidateQueries({
        queryKey: ['suggestion', suggestion.slug],
      });
    },
    onError: (error) => {
      console.error('Error toggling like:', error);
    },
  });

  const handleLikeClick = () => {
    if (!user) {
      // You might want to show a login prompt or redirect to login
      console.log('Please log in to like suggestions');
      return;
    }

    likeMutation.mutate({ isLiking: !userLiked });
  };
  if (isLoading) {
    return (
      <SuggestionWrapper>
        <SkeletonLikes />

        <SuggestionContent>
          <SuggestionDetailsWrapper>
            <div>
              <SkeletonTextHeading />
              <SkeletonTextDesc />
            </div>
            <SkeletonTextReply />
          </SuggestionDetailsWrapper>
          <SkeletonCat />
        </SuggestionContent>
      </SuggestionWrapper>
    );
  }

  return (
    <SuggestionWrapper>
      {' '}
      <Likes
        onClick={handleLikeClick}
        disabled={likeMutation.isPending}
        style={{
          backgroundColor: userLiked
            ? 'var(--color-blue)'
            : 'var(--color-like)',
        }}
      >
        <img
          src={arrowUp}
          alt=""
          style={{ filter: userLiked ? 'brightness(0) invert(1)' : 'none' }}
        />
        <span style={{ color: userLiked ? 'white' : 'var(--color-dark-blue)' }}>
          {likeMutation.isPending ? '...' : likesCount}
        </span>
      </Likes>
      <SuggestionContent>
        <SuggestionDetailsWrapper>
          <div>
            {isSuggestionPage ? (
              <h1>{title}</h1>
            ) : (
              <Link to={`/feedback/${slug}`}>{title}</Link>
            )}
            <p>{description}</p>
          </div>
        </SuggestionDetailsWrapper>
        <Button variant="filter" size="sm">
          {category?.category || 'No Category'}
        </Button>
      </SuggestionContent>{' '}
      <CommentsWrapper>
        <CommentLogo amount={commentsCount} />
      </CommentsWrapper>
    </SuggestionWrapper>
  );
}
