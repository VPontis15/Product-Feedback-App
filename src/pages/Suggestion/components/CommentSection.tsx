import { useQuery } from '@tanstack/react-query';
import supabase from '../../../api/supabase';
import styled from 'styled-components';
import Comment from './Comment';

const CommentSectionContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding-block-start: 1.5rem;
  padding-block-end: 1.5rem;
  background-color: var(--color-white);
  border-radius: var(--btn-radius);
  padding-inline: 2.125rem;

  h2 {
    display: inline-flex;
    gap: 0.5rem;
    align-items: center;
    font-size: var(--fs-lg);
    font-weight: 700;
  }
`;

export default function CommentSection({
  suggestionId,
}: {
  suggestionId: number;
}) {
  const {
    data: comments,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['suggestion-comment', suggestionId],
    queryFn: async () => {
      try {
        const { data: comments, error } = await supabase
          .from('comment')
          .select(
            `*,
            user:user_id (*)`
          )
          .eq('feedback_id', suggestionId)
          .order('created_at', { ascending: false });
        if (error) {
          throw new Error(error.message);
        }
        return comments || [];
      } catch (error) {
        console.error('Error fetching comments:', error);
        throw error; // Re-throw the error so React Query can handle it properly
      }
    },
    // Only run the query if we have a valid suggestionId
    enabled: !!suggestionId,
  });

  console.log('comments', comments);
  return (
    <CommentSectionContainer>
      {isLoading ? (
        <>
          <h2>Loading comments...</h2>
          <Comment isLoading={true} comment={{} as any} />
          <Comment isLoading={true} comment={{} as any} />
        </>
      ) : error ? (
        <p>Error loading comments: {error.message}</p>
      ) : (
        <>
          <h2>
            <span>{comments?.length || 0}</span>{' '}
            {comments?.length == 1 ? 'Comment' : 'Comments'}
          </h2>
          {comments
            ?.filter((comment) => comment.parent_comment_id === null)
            ?.map((comment) => (
              <Comment
                isLoading={false}
                comment={comment}
                key={comment.id}
                allComments={comments}
              />
            ))}
        </>
      )}
    </CommentSectionContainer>
  );
}
